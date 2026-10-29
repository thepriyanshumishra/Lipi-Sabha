import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { ProjectPage } from '@/pages/ProjectPage';
import { LearnPage } from '@/pages/LearnPage';
import { QuestPage } from '@/pages/QuestPage';
import { LabPage } from '@/pages/LabPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ContributePage } from '@/pages/ContributePage';
import { NewContributionPage } from '@/pages/NewContributionPage';
import { ContributionsPage } from '@/pages/ContributionsPage';
import { ContributionDetailPage } from '@/pages/ContributionDetailPage';
import { ReviewPage } from '@/pages/ReviewPage';
import { ReviewTaskPage } from '@/pages/ReviewTaskPage';
import { SabhaPage } from '@/pages/SabhaPage';
import { ProposalPage } from '@/pages/ProposalPage';
import { DecisionPage } from '@/pages/DecisionPage';
import { AdminPage } from '@/pages/AdminPage';
import { AboutPage } from '@/pages/AboutPage';
import { GuidelinesPage } from '@/pages/GuidelinesPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public 2-Page Experience */}
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<HomePage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route path="/learn/:questId" element={<QuestPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guidelines" element={<GuidelinesPage />} />
        
        {/* Auth routes */}
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        
        {/* Authenticated routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/contribute/new" element={<NewContributionPage />} />
        <Route path="/contributions" element={<ContributionsPage />} />
        <Route path="/contributions/:contributionId" element={<ContributionDetailPage />} />
        
        {/* Reviewer routes */}
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/review/:taskId" element={<ReviewTaskPage />} />
        
        {/* Community routes */}
        <Route path="/sabha" element={<SabhaPage />} />
        <Route path="/sabha/proposals/:proposalId" element={<ProposalPage />} />
        <Route path="/sabha/decisions/:decisionId" element={<DecisionPage />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
