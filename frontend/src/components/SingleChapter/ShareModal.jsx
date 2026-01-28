import React, { useState, useEffect } from "react";
import { Copy, Check, Link2, Unlink, Share2, Loader2 } from "lucide-react";
import { shareChapter, unshareChapter, getShareInfo } from "@services/shareService";
import { showSuccess, showError } from "@utils/toast";

const ShareModal = ({ isOpen, onClose, chapterId, chapterName }) => {
  const [loading, setLoading] = useState(false);
  const [fetchingInfo, setFetchingInfo] = useState(true);
  const [shareInfo, setShareInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  const shareUrl = shareInfo?.shareToken
    ? `${window.location.origin}/shared/${shareInfo.shareToken}`
    : "";

  const fetchShareInfo = async () => {
    if (!chapterId) return;

    setFetchingInfo(true);
    try {
      const response = await getShareInfo(chapterId);
      if (response.success) {
        setShareInfo(response.data.shareInfo);
      }
    } catch (error) {
      console.error("Error fetching share info:", error);
    } finally {
      setFetchingInfo(false);
    }
  };

  useEffect(() => {
    if (isOpen && chapterId) {
      fetchShareInfo();
    }
  }, [isOpen, chapterId]);

  const handleShare = async () => {
    setLoading(true);
    try {
      const response = await shareChapter(chapterId);
      if (response.success) {
        setShareInfo({
          shareToken: response.data.shareToken,
          isPublic: response.data.isPublic,
        });
        showSuccess("Share link generated successfully!");
      }
    } catch (error) {
      showError("Failed to generate share link");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async () => {
    setLoading(true);
    try {
      const response = await unshareChapter(chapterId);
      if (response.success) {
        setShareInfo({ shareToken: null, isPublic: false });
        showSuccess("Share link revoked successfully!");
      }
    } catch (error) {
      showError("Failed to revoke share link");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showSuccess("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showError("Failed to copy link");
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className={`modal h-screen ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-white rounded-2xl shadow-lg max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-light-blue/10 rounded-xl">
            <Share2 size={22} className="text-light-blue" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-dark-blue">Share Chapter</h3>
            <p className="text-xs text-black/50 line-clamp-1">{chapterName}</p>
          </div>
        </div>

        {fetchingInfo ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={24} className="animate-spin text-light-blue" />
          </div>
        ) : shareInfo?.isPublic && shareInfo?.shareToken ? (
          <>
            {/* Share link active */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Link2 size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Link is active
                </span>
              </div>
              <p className="text-xs text-green-600">
                Anyone with this link can view this chapter
              </p>
            </div>

            {/* Share URL */}
            <div className="mb-4">
              <label className="text-sm font-medium text-dark-blue/80 mb-2 block">
                Share Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-black/10 rounded-xl text-sm text-dark-blue/80 truncate"
                />
                <button
                  onClick={handleCopy}
                  className="p-2 bg-light-blue text-white rounded-xl hover:bg-light-blue/90 transition-colors"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* Revoke button */}
            <button
              onClick={handleRevoke}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Unlink size={18} />
              )}
              Revoke Share Link
            </button>
          </>
        ) : (
          <>
            {/* No share link */}
            <div className="bg-gray-50 border border-black/6 rounded-xl p-4 mb-4 text-center">
              <Unlink size={32} className="text-black/30 mx-auto mb-2" />
              <p className="text-sm text-black/60">
                This chapter is not currently shared
              </p>
              <p className="text-xs text-black/40 mt-1">
                Generate a link to share this chapter publicly
              </p>
            </div>

            {/* Generate button */}
            <button
              onClick={handleShare}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-light-blue text-white rounded-xl hover:bg-light-blue/90 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Link2 size={18} />
              )}
              Generate Share Link
            </button>
          </>
        )}

        {/* Close button */}
        <div className="modal-action mt-4">
          <button
            className="btn px-6 py-2 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-100 font-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default ShareModal;
