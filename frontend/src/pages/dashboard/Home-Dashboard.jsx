import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Image as ImageIcon,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";
import { getDashboardData } from "@services/dashboardService";
import StatCard from "@/components/Dashboard/StatCard";
import ProgressCard from "@/components/Dashboard/ProgressCard";
import RecentBookCard from "@/components/Dashboard/RecentBookCard";
import RecentChapterCard from "@/components/Dashboard/RecentChapterCard";
import EmptyState from "@/components/Dashboard/EmptyState";
import {
  StatCardSkeleton,
  ProgressCardSkeleton,
  RecentCardSkeleton,
} from "@/components/Dashboard/SkeletonCard";

const HomeDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboardData();
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statistics = dashboardData?.statistics;
  const recentBooks = dashboardData?.recentBooks || [];
  const recentChapters = dashboardData?.recentChapters || [];

  return (
    <div className="max-h-fit min-h-screen w-full rounded-xl bg-[#F7F7F7] p-3 md:p-5">
      {/* Welcome Section */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-dark-blue">
          Welcome to Study Sync
        </h1>
        <p className="text-sm md:text-base text-black/60 mt-1">
          Track your learning progress and continue where you left off
        </p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        {loading ? (
          <>
            <ProgressCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            {/* Progress Card - takes 2 columns on larger screens */}
            {statistics && <ProgressCard statistics={statistics} />}

            {/* Individual stat cards */}
            <StatCard
              icon={BookOpen}
              title="Total Books"
              value={statistics?.books?.total || 0}
              subtitle={`${statistics?.books?.completed || 0} completed`}
              color="text-light-blue"
              bgColor="bg-light-blue/10"
            />
            <StatCard
              icon={FileText}
              title="Total Chapters"
              value={statistics?.chapters?.total || 0}
              subtitle={`${statistics?.chapters?.completed || 0} completed`}
              color="text-light-pink"
              bgColor="bg-light-pink/10"
            />
          </>
        )}
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              icon={ImageIcon}
              title="Total Images"
              value={statistics?.images?.total || 0}
              subtitle={`${statistics?.images?.completed || 0} completed`}
              color="text-green-600"
              bgColor="bg-green-100"
            />
            <StatCard
              icon={Heart}
              title="Favorite Books"
              value={statistics?.books?.favourites || 0}
              color="text-red-500"
              bgColor="bg-red-50"
            />
            <StatCard
              icon={Heart}
              title="Favorite Chapters"
              value={statistics?.chapters?.favourites || 0}
              color="text-pink-500"
              bgColor="bg-pink-50"
            />
            <StatCard
              icon={Sparkles}
              title="Study Streak"
              value={`${statistics?.overall?.progress || 0}%`}
              subtitle="Overall completion"
              color="text-amber-500"
              bgColor="bg-amber-50"
            />
          </>
        )}
      </div>

      {/* Recent Books Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-dark-blue">
              Recent Books
            </h2>
            <p className="text-xs md:text-sm text-black/50">
              Continue where you left off
            </p>
          </div>
          <button
            onClick={() => navigate("/Books")}
            className="flex items-center gap-1 text-xs md:text-sm font-medium text-light-blue hover:underline"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <RecentCardSkeleton key={i} />
            ))}
          </div>
        ) : recentBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {recentBooks.map((book) => (
              <RecentBookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-black/6">
            <EmptyState
              icon={BookOpen}
              title="No books yet"
              description="Create your first book to get started"
            />
          </div>
        )}
      </div>

      {/* Recent Chapters Section */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-dark-blue">
              Recent Chapters
            </h2>
            <p className="text-xs md:text-sm text-black/50">
              Your recently updated chapters
            </p>
          </div>
          <button
            onClick={() => navigate("/Chapters")}
            className="flex items-center gap-1 text-xs md:text-sm font-medium text-light-blue hover:underline"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <RecentCardSkeleton key={i} />
            ))}
          </div>
        ) : recentChapters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {recentChapters.map((chapter) => (
              <RecentChapterCard key={chapter._id} chapter={chapter} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-black/6">
            <EmptyState
              icon={FileText}
              title="No chapters yet"
              description="Add chapters to your books to see them here"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeDashboard;
