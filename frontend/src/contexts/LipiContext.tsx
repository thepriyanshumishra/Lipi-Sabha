import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  SUPPORTED_LIPIS,
  type LipiDefinition,
  type LipiKnowledgeNode,
  type LipiTestSubmission,
  type ScriptProject,
  type ScriptProjectBranch,
  DEFAULT_SUBMISSIONS,
  DEFAULT_PROJECTS,
  getLipiById
} from '@/data/lipiData';

interface LipiContextType {
  activeLipi: LipiDefinition;
  activeLipiId: string;
  setLipiId: (id: string) => void;
  allLipis: LipiDefinition[];

  // Dynamic Tree Nodes (Curated by Reviewers)
  getNodesForLipi: (lipiId: string) => LipiKnowledgeNode[];
  activeLipiNodes: LipiKnowledgeNode[];
  addKnowledgeNode: (lipiId: string, node: LipiKnowledgeNode) => void;
  updateKnowledgeNode: (lipiId: string, nodeId: string, patch: Partial<LipiKnowledgeNode>) => void;
  deleteKnowledgeNode: (lipiId: string, nodeId: string) => void;

  // Submissions & Review Workflow
  submissions: LipiTestSubmission[];
  getSubmissionsForLipi: (lipiId: string) => LipiTestSubmission[];
  submitTestSample: (
    data: Omit<LipiTestSubmission, 'id' | 'status' | 'submittedAt'>
  ) => LipiTestSubmission;
  approveSubmission: (submissionId: string, rationale: string, reviewerName: string) => void;
  rejectSubmission: (submissionId: string, rationale: string, reviewerName: string) => void;

  // Community Script Projects & Dilemma Trees (The MVP Core)
  projects: ScriptProject[];
  getProjectsForLipi: (lipiId: string) => ScriptProject[];
  createProject: (
    data: Omit<ScriptProject, 'id' | 'submittedAt' | 'status'>
  ) => ScriptProject;
  verifyProject: (
    projectId: string,
    comment: string,
    reviewerName: string,
    acceptedOption?: string
  ) => void;
  flagProject: (
    projectId: string,
    reason: string,
    reviewerName: string,
    acceptedOption?: string
  ) => void;
  voteOnProject: (projectId: string, direction: 'up' | 'down') => void;
  userVotesMap: Record<string, 'up' | 'down'>;
  voteOnBranch: (projectId: string, branchId: string) => void;
  userBranchVotesMap: Record<string, string>;
  addCommentToProject: (
    projectId: string,
    content: string,
    author: string,
    authorRole?: string
  ) => void;
  likeComment: (projectId: string, commentId: string) => void;
  ratifyProject: (
    projectId: string,
    recommendedBranchId: string,
    rationale: string,
    reviewerName: string
  ) => void;
}

const LipiContext = createContext<LipiContextType | undefined>(undefined);

const STORAGE_KEY_LIPI = 'lipi_sabha_active_lipi_id';
const STORAGE_KEY_NODES = 'lipi_sabha_dynamic_nodes_map';
const STORAGE_KEY_SUBS = 'lipi_sabha_test_submissions_list';
const STORAGE_KEY_PROJS = 'lipi_sabha_script_projects_list';

function getInitialNodesMap(): Record<string, LipiKnowledgeNode[]> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_NODES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch {
    // fallback
  }

  const map: Record<string, LipiKnowledgeNode[]> = {};
  SUPPORTED_LIPIS.forEach((lipi) => {
    map[lipi.id] = [...lipi.knowledgeNodes];
  });
  return map;
}

function getInitialSubmissions(): LipiTestSubmission[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SUBS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return [...DEFAULT_SUBMISSIONS];
}

function getInitialProjects(): ScriptProject[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PROJS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return [...DEFAULT_PROJECTS];
}

export function LipiProvider({ children }: { children: ReactNode }) {
  const [activeLipiId, setActiveLipiIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIPI);
      if (saved && SUPPORTED_LIPIS.some((l) => l.id === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'devanagari';
  });

  const [nodesMap, setNodesMap] = useState<Record<string, LipiKnowledgeNode[]>>(getInitialNodesMap);
  const [submissions, setSubmissions] = useState<LipiTestSubmission[]>(getInitialSubmissions);
  const [projects, setProjects] = useState<ScriptProject[]>(getInitialProjects);
  const [userVotesMap, setUserVotesMap] = useState<Record<string, 'up' | 'down'>>(() => {
    try {
      const saved = localStorage.getItem('lipi_sabha_user_card_votes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const [userBranchVotesMap, setUserBranchVotesMap] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('lipi_sabha_user_branch_votes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const activeLipi = getLipiById(activeLipiId);

  const setLipiId = (id: string) => {
    if (SUPPORTED_LIPIS.some((l) => l.id === id)) {
      setActiveLipiIdState(id);
      try {
        localStorage.setItem(STORAGE_KEY_LIPI, id);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-active-lipi', activeLipiId);
  }, [activeLipiId]);

  const saveNodesMap = (newMap: Record<string, LipiKnowledgeNode[]>) => {
    setNodesMap(newMap);
    try {
      localStorage.setItem(STORAGE_KEY_NODES, JSON.stringify(newMap));
    } catch {
      // ignore
    }
  };

  const saveSubmissions = (newSubs: LipiTestSubmission[]) => {
    setSubmissions(newSubs);
    try {
      localStorage.setItem(STORAGE_KEY_SUBS, JSON.stringify(newSubs));
    } catch {
      // ignore
    }
  };

  const saveProjects = (newProjs: ScriptProject[]) => {
    setProjects(newProjs);
    try {
      localStorage.setItem(STORAGE_KEY_PROJS, JSON.stringify(newProjs));
    } catch {
      // ignore
    }
  };

  const getNodesForLipi = (lipiId: string): LipiKnowledgeNode[] => {
    return nodesMap[lipiId] || getLipiById(lipiId).knowledgeNodes;
  };

  const activeLipiNodes = getNodesForLipi(activeLipiId);

  const addKnowledgeNode = (lipiId: string, node: LipiKnowledgeNode) => {
    const existing = nodesMap[lipiId] || [...getLipiById(lipiId).knowledgeNodes];
    const updated = [...existing, node];
    saveNodesMap({
      ...nodesMap,
      [lipiId]: updated
    });
  };

  const updateKnowledgeNode = (
    lipiId: string,
    nodeId: string,
    patch: Partial<LipiKnowledgeNode>
  ) => {
    const existing = nodesMap[lipiId] || [...getLipiById(lipiId).knowledgeNodes];
    const updated = existing.map((n) => (n.id === nodeId ? { ...n, ...patch } : n));
    saveNodesMap({
      ...nodesMap,
      [lipiId]: updated
    });
  };

  const deleteKnowledgeNode = (lipiId: string, nodeId: string) => {
    const existing = nodesMap[lipiId] || [...getLipiById(lipiId).knowledgeNodes];
    const updated = existing.filter((n) => n.id !== nodeId);
    saveNodesMap({
      ...nodesMap,
      [lipiId]: updated
    });
  };

  const submitTestSample = (
    data: Omit<LipiTestSubmission, 'id' | 'status' | 'submittedAt'>
  ): LipiTestSubmission => {
    const newSub: LipiTestSubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      status: 'pending',
      submittedAt: 'Just now'
    };
    saveSubmissions([newSub, ...submissions]);
    return newSub;
  };

  const approveSubmission = (submissionId: string, rationale: string, reviewerName: string) => {
    const updated = submissions.map((sub) => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          status: 'approved' as const,
          reviewerRationale: rationale,
          reviewerName,
          evaluatedAt: 'Just now'
        };
      }
      return sub;
    });
    saveSubmissions(updated);
  };

  const rejectSubmission = (submissionId: string, rationale: string, reviewerName: string) => {
    const updated = submissions.map((sub) => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          status: 'rejected' as const,
          reviewerRationale: rationale,
          reviewerName,
          evaluatedAt: 'Just now'
        };
      }
      return sub;
    });
    saveSubmissions(updated);
  };

  const getSubmissionsForLipi = (lipiId: string): LipiTestSubmission[] => {
    return submissions.filter((s) => s.lipiId === lipiId);
  };

  // MVP: Script Project Methods
  const createProject = (
    data: Omit<ScriptProject, 'id' | 'submittedAt' | 'status'>
  ): ScriptProject => {
    const newProj: ScriptProject = {
      ...data,
      id: `proj-${Date.now()}`,
      status: 'unverified', // Unverified by default! Will only show on public page after reviewer verifies!
      submittedAt: 'Just now'
    };
    saveProjects([newProj, ...projects]);
    return newProj;
  };

  const verifyProject = (
    projectId: string,
    comment: string,
    reviewerName: string,
    acceptedOption?: string
  ) => {
    const updated = projects.map((proj) => {
      if (proj.id === projectId) {
        return {
          ...proj,
          status: 'verified' as const,
          reviewerVerdict: {
            reviewerName,
            rationale: comment,
            acceptedOption,
            ratifiedAt: 'Just now'
          }
        };
      }
      return proj;
    });
    saveProjects(updated);
  };

  const flagProject = (
    projectId: string,
    reason: string,
    reviewerName: string,
    acceptedOption?: string
  ) => {
    const updated = projects.map((proj) => {
      if (proj.id === projectId) {
        return {
          ...proj,
          status: 'flagged' as const,
          reviewerVerdict: {
            reviewerName,
            rationale: reason,
            acceptedOption,
            ratifiedAt: 'Just now'
          }
        };
      }
      return proj;
    });
    saveProjects(updated);
  };

  const voteOnProject = (projectId: string, direction: 'up' | 'down') => {
    const currentVote = userVotesMap[projectId];
    let newVote: 'up' | 'down' | null = direction;

    let upDelta = 0;
    let downDelta = 0;

    if (currentVote === direction) {
      newVote = null;
      if (direction === 'up') upDelta = -1;
      else downDelta = -1;
    } else if (currentVote) {
      if (direction === 'up') {
        upDelta = 1;
        downDelta = -1;
      } else {
        upDelta = -1;
        downDelta = 1;
      }
    } else {
      if (direction === 'up') upDelta = 1;
      else downDelta = 1;
    }

    const updatedProjects = projects.map((p) => {
      if (p.id === projectId) {
        const curUp = p.upvotes ?? 0;
        const curDown = p.downvotes ?? 0;
        return {
          ...p,
          upvotes: Math.max(0, curUp + upDelta),
          downvotes: Math.max(0, curDown + downDelta)
        };
      }
      return p;
    });

    const updatedUserVotes = { ...userVotesMap };
    if (newVote) {
      updatedUserVotes[projectId] = newVote;
    } else {
      delete updatedUserVotes[projectId];
    }

    setUserVotesMap(updatedUserVotes);
    try {
      localStorage.setItem('lipi_sabha_user_card_votes', JSON.stringify(updatedUserVotes));
    } catch {}
    saveProjects(updatedProjects);
  };

  const voteOnBranch = (projectId: string, branchId: string) => {
    const currentVotedBranch = userBranchVotesMap[projectId];
    let updatedBranchVote = currentVotedBranch === branchId ? '' : branchId;

    const updatedProjects = projects.map((proj) => {
      if (proj.id === projectId) {
        const branches = proj.branches || [];
        const updatedBranches = branches.map((b) => {
          if (currentVotedBranch === branchId && b.id === branchId) {
            // Unvoting (toggle off)
            return { ...b, communityVotes: Math.max(0, b.communityVotes - 1) };
          }
          if (currentVotedBranch && currentVotedBranch !== branchId && b.id === currentVotedBranch) {
            // Decrement previous branch
            return { ...b, communityVotes: Math.max(0, b.communityVotes - 1) };
          }
          if (b.id === branchId) {
            // Increment newly voted branch
            return { ...b, communityVotes: b.communityVotes + 1 };
          }
          return b;
        });
        return { ...proj, branches: updatedBranches };
      }
      return proj;
    });

    const updatedMap = { ...userBranchVotesMap };
    if (updatedBranchVote) {
      updatedMap[projectId] = updatedBranchVote;
    } else {
      delete updatedMap[projectId];
    }

    setUserBranchVotesMap(updatedMap);
    try {
      localStorage.setItem('lipi_sabha_user_branch_votes', JSON.stringify(updatedMap));
    } catch {}

    saveProjects(updatedProjects);
  };

  const addCommentToProject = (
    projectId: string,
    content: string,
    author: string,
    authorRole?: string
  ) => {
    if (!content.trim()) return;
    const newComment = {
      id: `comm-${Date.now()}`,
      author: author.trim() || 'Community Contributor',
      authorRole: authorRole || 'Speaker',
      content: content.trim(),
      createdAt: 'Just now',
      likes: 0
    };

    const updated = projects.map((proj) => {
      if (proj.id === projectId) {
        return {
          ...proj,
          comments: [...(proj.comments || []), newComment]
        };
      }
      return proj;
    });
    saveProjects(updated);
  };

  const likeComment = (projectId: string, commentId: string) => {
    const updated = projects.map((proj) => {
      if (proj.id === projectId) {
        const updatedComments = (proj.comments || []).map((c) =>
          c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c
        );
        return { ...proj, comments: updatedComments };
      }
      return proj;
    });
    saveProjects(updated);
  };

  const ratifyProject = (
    projectId: string,
    recommendedBranchId: string,
    rationale: string,
    reviewerName: string
  ) => {
    const updated = projects.map((proj) => {
      if (proj.id === projectId) {
        return {
          ...proj,
          status: 'verified' as const,
          reviewerVerdict: {
            recommendedBranchId,
            reviewerName,
            rationale,
            ratifiedAt: 'Just now'
          }
        };
      }
      return proj;
    });
    saveProjects(updated);
  };

  const getProjectsForLipi = (lipiId: string): ScriptProject[] => {
    return projects.filter((p) => p.lipiId === lipiId);
  };

  return (
    <LipiContext.Provider
      value={{
        activeLipi,
        activeLipiId,
        setLipiId,
        allLipis: SUPPORTED_LIPIS,
        getNodesForLipi,
        activeLipiNodes,
        addKnowledgeNode,
        updateKnowledgeNode,
        deleteKnowledgeNode,
        submissions,
        getSubmissionsForLipi,
        submitTestSample,
        approveSubmission,
        rejectSubmission,
        projects,
        getProjectsForLipi,
        createProject,
        verifyProject,
        flagProject,
        voteOnProject,
        userVotesMap,
        voteOnBranch,
        userBranchVotesMap,
        addCommentToProject,
        likeComment,
        ratifyProject
      }}
    >
      {children}
    </LipiContext.Provider>
  );
}

export function useLipi() {
  const context = useContext(LipiContext);
  if (!context) {
    throw new Error('useLipi must be used within a LipiProvider');
  }
  return context;
}
