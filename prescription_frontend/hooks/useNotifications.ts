'use client';

import { useEffect, useState, useCallback } from 'react';
import { getSocket, disconnectSocket } from '@/lib/socket';

export interface Notification {
  id: string;
  type: string;
  titre: string;
  contenu: any;
  statut: 'EN_ATTENTE' | 'ENVOYE' | 'LU';
  createdAt: string;
  patientId: string;
  referenceId: string;
  referenceType: string;
}

export function useNotifications(userId: string, service?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connected, setConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const socket = getSocket(userId, service);

    socket.on('connect', () => {
      setConnected(true);
      console.log('[WS] Connecté au serveur de notifications');
    });

    socket.on('disconnect', () => {
      setConnected(false);
      console.log('[WS] Déconnecté — reconnexion automatique...');
    });

    socket.on('notification', (notif: Notification) => {
      setNotifications(prev => {
        // Éviter les doublons
        if (prev.find(n => n.id === notif.id)) return prev;
        return [notif, ...prev];
      });
      setUnreadCount(prev => prev + 1);

      // Son de notification
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } catch {}
    });

    socket.on('ack_confirmed', ({ notificationId }: { notificationId: string }) => {
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, statut: 'LU' } : n)
      );
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('notification');
      socket.off('ack_confirmed');
      disconnectSocket();
    };
  }, [userId, service]);

  const markAsRead = useCallback((notificationId: string) => {
    const socket = getSocket(userId, service);
    socket.emit('ack', { notificationId });
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, [userId, service]);

  const markAllAsRead = useCallback(() => {
    notifications
      .filter(n => n.statut !== 'LU')
      .forEach(n => markAsRead(n.id));
    setUnreadCount(0);
  }, [notifications, markAsRead]);

  return { notifications, connected, unreadCount, markAsRead, markAllAsRead };
}
