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
    reviewerName: string
  ) => void;
  voteOnBranch: (projectId: string, branchId: string) => void;
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
    reviewerName: string
  ) => {
    const updated = projects.map((proj) => {
      if (proj.id === projectId) {
        return {
          ...proj,
          status: 'flagged' as const,
          reviewerVerdict: {
            reviewerName,
            rationale: reason,
            ratifiedAt: 'Just now'
          }
        };
      }
      return proj;
    });
    saveProjects(updated);
  };

  const voteOnBranch = (projectId: string, branchId: string) => {
    const updated = projects.map((proj) => {
      if (proj.id === projectId) {
        const branches = proj.branches || [];
        const updatedBranches = branches.map((b) => {
          if (b.id === branchId) {
            return { ...b, communityVotes: b.communityVotes + 1 };
          }
          return b;
        });
        return { ...proj, branches: updatedBranches };
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
        voteOnBranch,
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
