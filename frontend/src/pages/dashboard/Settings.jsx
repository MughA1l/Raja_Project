import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  User,
  Lock,
  BarChart3,
  Shield,
  Camera,
  Mail,
  AtSign,
  Eye,
  EyeOff,
  BookOpen,
  Layers,
  Image,
  Heart,
  CheckCircle2,
  LogOut,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { showSuccess, showError } from "@utils/toast";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserStatistics,
  logoutAllSessions,
  deleteAccount,
} from "@services/settingsService";
import { logoutUser } from "@services/authService";
import ConfirmationModal from "@general/ConfirmationModal";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const validTabs = ["profile", "security", "statistics", "account"];
  const initialTab = validTabs.includes(tabFromUrl) ? tabFromUrl : "profile";

  const [activeTab, setActiveTab] = useState(initialTab);

  // Profile state
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profileImage: null,
    previewImage: null,
    createdAt: null,
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Statistics state
  const [statistics, setStatistics] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Account actions state
  const [logoutAllLoading, setLogoutAllLoading] = useState(false);
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutAllModal, setShowLogoutAllModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  // Initial data fetch
  const [initialLoading, setInitialLoading] = useState(true);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "statistics", label: "Statistics", icon: BarChart3 },
    { id: "account", label: "Account", icon: Shield },
  ];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setInitialLoading(true);
      const [profileRes, statsRes] = await Promise.all([
        getUserProfile(),
        getUserStatistics(),
      ]);

      if (profileRes.success) {
        setProfile({
          username: profileRes.data.username || "",
          email: profileRes.data.email || "",
          profileImage: profileRes.data.profileImage,
          previewImage: profileRes.data.profileImage,
          createdAt: profileRes.data.createdAt,
        });
      }

      if (statsRes.success) {
        setStatistics(statsRes.data);
      }
    } catch (error) {
      showError("Failed to load settings data");
    } finally {
      setInitialLoading(false);
      setStatsLoading(false);
    }
  };

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfile((prev) => ({
        ...prev,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("email", profile.email);
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }

      const res = await updateUserProfile(formData);
      if (res.success) {
        showSuccess("Profile updated successfully!");
        setProfile((prev) => ({
          ...prev,
          profileImage: res.data.user.profileImage,
          previewImage: res.data.user.profileImage,
        }));
        setProfileImageFile(null);
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  // Password handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 4) {
      showError("Password must be at least 4 characters");
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (res.success) {
        showSuccess("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogoutAll = async () => {
    setLogoutAllLoading(true);
    try {
      const res = await logoutAllSessions();
      if (res.success) {
        showSuccess("Logged out from all devices!");
        setShowLogoutAllModal(false);
        await logoutUser();
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to logout");
    } finally {
      setLogoutAllLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      showError("Please enter your password");
      return;
    }

    setDeleteAccountLoading(true);
    try {
      const res = await deleteAccount({ password: deletePassword });
      if (res.success) {
        showSuccess("Account deleted successfully!");
        setShowDeleteModal(false);
        await logoutUser();
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to delete account");
    } finally {
      setDeleteAccountLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen w-full rounded-xl bg-[#F7F7F7] p-3 md:p-5">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full">
          {/* Left Sidebar Skeleton */}
          <div className="w-full md:w-52 flex-shrink-0">
            <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-100">
              <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-2 md:space-x-0 md:space-y-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 animate-pulse whitespace-nowrap">
                    <div className="w-4 h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Skeleton */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              {/* Header Skeleton */}
              <div className="mb-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-40 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-56"></div>
              </div>

              {/* Avatar Skeleton */}
              <div className="flex items-center gap-4 mb-6 animate-pulse">
                <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                  <div className="h-3 bg-slate-200 rounded w-32"></div>
                </div>
              </div>

              {/* Form Fields Skeleton */}
              <div className="space-y-5 animate-pulse">
                <div>
                  <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
                  <div className="h-11 bg-slate-200 rounded-lg w-full"></div>
                </div>
                <div>
                  <div className="h-4 bg-slate-200 rounded w-16 mb-2"></div>
                  <div className="h-11 bg-slate-200 rounded-lg w-full"></div>
                </div>
                <div className="h-3 bg-slate-200 rounded w-32"></div>
                <div className="h-10 bg-slate-200 rounded-lg w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full rounded-xl bg-[#F7F7F7] p-3 md:p-5">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full">
        {/* Left Sidebar - Tabs */}
        <div className="w-full md:w-52 flex-shrink-0">
          <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-100">
            <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-2 md:space-x-0 md:space-y-1 scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto hidden md:block" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">Profile Settings</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Update your personal information</p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-5">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-200">
                        {profile.previewImage ? (
                          <img
                            src={profile.previewImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <label className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        <Camera className="w-5 h-5 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Profile Photo</p>
                      <p className="text-xs text-slate-400">Click to upload new photo</p>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Username
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleProfileChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 text-sm"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 text-sm"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="text-xs text-slate-400">
                    Member since {formatDate(profile.createdAt)}
                  </div>

                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                  >
                    {profileLoading ? (
                      <span className="loading loading-dots loading-sm"></span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">Security</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Manage your password</p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                  >
                    {passwordLoading ? (
                      <span className="loading loading-dots loading-sm"></span>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === "statistics" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">Statistics</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Your activity overview</p>
                </div>

                {statsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 animate-pulse">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-4 h-4 bg-slate-200 rounded"></div>
                          <div className="h-4 bg-slate-200 rounded w-16"></div>
                        </div>
                        <div className="h-8 bg-slate-200 rounded w-12 mb-2"></div>
                        <div className="flex gap-4">
                          <div className="h-3 bg-slate-200 rounded w-14"></div>
                          <div className="h-3 bg-slate-200 rounded w-12"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : statistics ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Books */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">Books</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800 mb-2">
                        {statistics.books?.total || 0}
                      </p>
                      <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-1 text-slate-500">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {statistics.books?.completed || 0} done
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Heart className="w-3 h-3 text-pink-500" />
                          {statistics.books?.favourites || 0} fav
                        </span>
                      </div>
                    </div>

                    {/* Chapters */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">Chapters</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800 mb-2">
                        {statistics.chapters?.total || 0}
                      </p>
                      <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-1 text-slate-500">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {statistics.chapters?.completed || 0} done
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Heart className="w-3 h-3 text-pink-500" />
                          {statistics.chapters?.favourites || 0} fav
                        </span>
                      </div>
                    </div>

                    {/* Images */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Image className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">Images</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800 mb-2">
                        {statistics.images?.total || 0}
                      </p>
                      <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-1 text-slate-500">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {statistics.images?.completed || 0} done
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Heart className="w-3 h-3 text-pink-500" />
                          {statistics.images?.favourites || 0} fav
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No statistics available</p>
                )}
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">Account</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Manage your account settings</p>
                </div>

                <div className="space-y-4 max-w-md">
                  {/* Logout All */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <LogOut className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-slate-700">Logout All Devices</h3>
                        <p className="text-xs text-slate-400 mt-0.5 mb-3">
                          Sign out from all devices including this one
                        </p>
                        <button
                          onClick={() => setShowLogoutAllModal(true)}
                          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Logout All
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Account */}
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg border border-red-200">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-red-700">Delete Account</h3>
                        <p className="text-xs text-red-400 mt-0.5 mb-3">
                          Permanently delete your account and all data
                        </p>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout All Modal */}
      <ConfirmationModal
        isOpen={showLogoutAllModal}
        title="Logout from all devices?"
        para="You will be logged out from all devices including this one."
        onCancel={() => setShowLogoutAllModal(false)}
        onConfirm={handleLogoutAll}
        loading={logoutAllLoading}
      />

      {/* Delete Account Modal */}
      <dialog className={`modal ${showDeleteModal ? "modal-open" : ""}`}>
        <div className="modal-box bg-white rounded-xl shadow-lg max-w-sm p-5">
          <h3 className="text-lg font-semibold text-slate-800">Delete Account</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">
            This will permanently delete your account and all data.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Enter password to confirm
            </label>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 text-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="flex gap-2">
            <button
              className="flex-1 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              onClick={() => {
                setShowDeleteModal(false);
                setDeletePassword("");
              }}
              disabled={deleteAccountLoading}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              onClick={handleDeleteAccount}
              disabled={deleteAccountLoading}
            >
              {deleteAccountLoading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/30">
          <button onClick={() => { setShowDeleteModal(false); setDeletePassword(""); }}>
            close
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default Settings;
