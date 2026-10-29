import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  SUPPORTED_LIPIS,
  type LipiDefinition,
  type LipiKnowledgeNode,
  type LipiTestSubmission,
  DEFAULT_SUBMISSIONS,
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
  deleteKnowledgeNode: (lipiId: string, nodeId: string) => void;

  // Submissions & Review Workflow
  submissions: LipiTestSubmission[];
  getSubmissionsForLipi: (lipiId: string) => LipiTestSubmission[];
  submitTestSample: (
    data: Omit<LipiTestSubmission, 'id' | 'status' | 'submittedAt'>
  ) => LipiTestSubmission;
  approveSubmission: (submissionId: string, rationale: string, reviewerName: string) => void;
  rejectSubmission: (submissionId: string, rationale: string, reviewerName: string) => void;
}

const LipiContext = createContext<LipiContextType | undefined>(undefined);

const STORAGE_KEY_LIPI = 'lipi_sabha_active_lipi_id';
const STORAGE_KEY_NODES = 'lipi_sabha_dynamic_nodes_map';
const STORAGE_KEY_SUBS = 'lipi_sabha_test_submissions_list';

// Helper to construct initial nodes map from canonical lipiData
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

// Helper to construct initial submissions
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

export function LipiProvider({ children }: { children: ReactNode }) {
  const [activeLipiId, setActiveLipiIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIPI);
      if (saved && SUPPORTED_LIPIS.some((l) => l.id === saved)) {
        return saved;
      }
    } catch {
      // ignore localStorage errors
    }
    return 'devanagari';
  });

  const [nodesMap, setNodesMap] = useState<Record<string, LipiKnowledgeNode[]>>(getInitialNodesMap);
  const [submissions, setSubmissions] = useState<LipiTestSubmission[]>(getInitialSubmissions);

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

  // Persist nodes map whenever updated
  const saveNodesMap = (newMap: Record<string, LipiKnowledgeNode[]>) => {
    setNodesMap(newMap);
    try {
      localStorage.setItem(STORAGE_KEY_NODES, JSON.stringify(newMap));
    } catch {
      // ignore
    }
  };

  // Persist submissions whenever updated
  const saveSubmissions = (newSubs: LipiTestSubmission[]) => {
    setSubmissions(newSubs);
    try {
      localStorage.setItem(STORAGE_KEY_SUBS, JSON.stringify(newSubs));
    } catch {
      // ignore
    }
  };

  // Retrieve nodes for a specific Lipi
  const getNodesForLipi = (lipiId: string): LipiKnowledgeNode[] => {
    return nodesMap[lipiId] || getLipiById(lipiId).knowledgeNodes;
  };

  const activeLipiNodes = getNodesForLipi(activeLipiId);

  // Reviewer actions: Add knowledge node / tree level
  const addKnowledgeNode = (lipiId: string, node: LipiKnowledgeNode) => {
    const existing = nodesMap[lipiId] || [...getLipiById(lipiId).knowledgeNodes];
    const updated = [...existing, node];
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

  // User actions: Submit a test sample
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

  // Reviewer actions: Calibrate & Approve / Reject
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
        deleteKnowledgeNode,
        submissions,
        getSubmissionsForLipi,
        submitTestSample,
        approveSubmission,
        rejectSubmission
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
