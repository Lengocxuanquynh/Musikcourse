import {
  Piano,
  Guitar,
  Music,
  Mic,
  Music2,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  piano: Piano,
  guitar: Guitar,
  violin: Music,
  vocal: Mic,
  organ: Music2,
  ukulele: Guitar,
  music: Music,
};

export function getCourseIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Music;
}
