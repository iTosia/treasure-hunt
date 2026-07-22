'use client';

import React, { useState, useEffect } from 'react';
import { getLeaderboard, LeaderboardEntry } from '../app/actions/leaderboard';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen]);

  async function fetchLeaderboard() {
    setIsLoading(true);
    try {
      const data = await getLeaderboard();
      setEntries(data);
    } catch (e) {
      console.error('Leaderboard fetch error:', e);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="result-overlay">
      <div className="result-modal">
        <div className="modal-icon">🏆</div>
        <h2 className="modal-title">Global Hall of Fame</h2>
        <p className="modal-subtitle">Top 10 Legendaries</p>

        <div className="leaderboard-list">
          {isLoading ? (
            <div className="leaderboard-loading">Loading...</div>
          ) : entries.length > 0 ? (
            entries.map((entry, index) => (
              <div key={entry.id} className="leaderboard-row">
                <span className="rank">{index + 1}</span>
                <span className="username">{entry.username}</span>
                <span className="score">{entry.score} <small>clicks</small></span>
              </div>
            ))
          ) : (
            <div className="leaderboard-empty">No records yet!</div>
          )}
        </div>

        <button onClick={onClose} className="modal-ok-btn">
          Close
        </button>
      </div>

      <style jsx>{`
        .leaderboard-list {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 300px;        
        }
        .leaderboard-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: var(--gold-bg-dim);
          border: 1px solid var(--gold-border-dim);
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .leaderboard-row:hover {
          background: var(--gold-bg-light);
          border-color: var(--gold-border-bright);
          transform: translateX(2px);
        }
        .rank {
          font-weight: 800;
          color: var(--gold-primary);
          width: 24px;
          font-size: 0.9rem;
        }
        .username {
          flex: 1;
          text-align: left;
          margin-left: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .score {
          font-weight: 800;
          color: var(--gold-primary);
          text-align: right;
        }
        .score small {
          font-size: 0.6rem;
          color: var(--text-muted);
          margin-left: 4px;
        }
        .leaderboard-loading, .leaderboard-empty {
          color: var(--text-muted);
          text-align: center;
          padding: 20px 0;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default LeaderboardModal;
