'use client';
import React from 'react';
import { CommunityUI } from '../../ui/Community/Community';

export function Community() {
  const riders = [
    { id: 'You', name: 'You', avatarBg: 'Orange', status: 'Riding now • 65mph', metaType: 'leader', metaValue: 'LEADER' },
    { id: 'M', name: 'Mike', avatarBg: 'Blue', status: '2.3 mi behind', metaType: 'eta', metaValue: 'ETA 12:42' },
    { id: 'J', name: 'Jessica', avatarBg: 'Purple', status: '4.1 mi behind', metaType: 'eta', metaValue: 'ETA 12:48' },
  ];

  return <CommunityUI riders={riders} />;
}
