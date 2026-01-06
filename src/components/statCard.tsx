import React from 'react';
import { LucideIcon, LayoutDashboard, CircleDashed, MapPin, Bed } from 'lucide-react';

// StatCard Component (កូដរបស់អ្នកដែលបានកែសម្រួល)
interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  textColor: string;
  isLast: boolean; // បន្ថែមដើម្បីឆែកមើលថាត្រូវដាក់បន្ទាត់ខណ្ឌឬអត់
}

const StatCard = ({ title, value, icon: Icon, iconBgColor, textColor, isLast }: StatCardProps) => {
  return (
    <div className="flex items-center flex-1">
      <div className="flex items-center gap-4 w-full justify-center">
        {/* Icon Wrapper */}
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${iconBgColor}`}>
          <Icon size={24} className="text-white" />
        </div>

        {/* Text Info */}
        <div className="flex flex-col">
          <span className={`text-xl font-bold leading-tight ${textColor}`}>
            {value}
          </span>
          <span className="text-gray-400 text-xs font-medium">
            {title}
          </span>
        </div>
      </div>

      {/* បន្ទាត់ខណ្ឌបញ្ឈរ (Vertical Divider) */}
      {!isLast && (
        <div className="h-10 w-[1px] bg-gray-200 hidden md:block" />
      )}
    </div>
  );
};
export default StatCard;