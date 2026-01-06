import { LucideIcon, LayoutDashboard, CircleDashed, MapPin, Bed } from 'lucide-react';
import Calendar from '../../components/calendar';
import StatCard from '../../components/statCard';

// បន្ថែម Interface នេះដើម្បីបំបាត់ Error "Cannot find name StatItem"
interface StatItem {
  id: number;
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  textColor: string;
}

const attendanceStats: StatItem[] = [
  { id: 1, title: "Total Day(s)", value: "19.5", icon: LayoutDashboard, iconBgColor: "bg-green-500", textColor: "text-green-500" },
  { id: 2, title: "Half Day(s)", value: "01", icon: CircleDashed, iconBgColor: "bg-orange-500", textColor: "text-orange-500" },
  { id: 3, title: "On Duty", value: "01", icon: MapPin, iconBgColor: "bg-indigo-600", textColor: "text-indigo-600" },
  { id: 4, title: "Leave(s)", value: "01", icon: Bed, iconBgColor: "bg-blue-500", textColor: "text-blue-500" },
];

const requests = [
  { id: 'EM011', name: 'Sok Dara', date: '12 Nov - 14 Nov', type: 'Leave' },
  { id: 'EM011', name: 'Sok Dara', date: '12 Nov - 14 Nov', type: 'Leave' },
  { id: 'EM011', name: 'Sok Dara', date: '12 Nov - 14 Nov', type: 'Leave' },
  { id: 'EM011', name: 'Sok Dara', date: '12 Nov - 14 Nov', type: 'Leave' },
  { id: 'EM011', name: 'Sok Dara', date: '12 Nov - 14 Nov', type: 'Leave' },
];  

const employeesOnLeave = [
  { id: 'EM011', name: 'Sok Dara', role:'UI Designer', days: 3, In:'9:00 AM', Out:'6:00 PM' },
  { id: 'EM012', name: 'Lang Makara', role:'Frontend Developer', days: 2, In:'9:00 AM', Out:'6:00 PM' },
  { id: 'EM013', name: 'Sok Dara', role:'Backend Developer', days: 1, In:'9:00 AM', Out:'6:00 PM' },
  { id: 'EM014', name: 'Chan Sopheak', role:'Project Manager', days: 4, In:'9:00 AM', Out:'6:00 PM' },
  { id: 'EM015', name: 'Meas Vanna', role:'QA Engineer', days: 2, In:'9:00 AM', Out:'6:00 PM' },
];

export default function DashboardPage() {
  const displayData = requests.slice(0, 5);
  const employeesData = employeesOnLeave.slice(0, 3);
  return (
    <div className="p-3 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        
        {/* ផ្នែកខាងឆ្វេង (Left Content - យក ២ ភាគ ៣) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/*Stats Cards Row - កែឱ្យផ្អឹបឆ្វេង */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border  border-gray-100 flex flex-row items-center justify-start overflow-x-auto">
            {attendanceStats.map((stat, index) => (
              <StatCard
                key={stat.id}   
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconBgColor={stat.iconBgColor}
                textColor={stat.textColor}
                isLast={index === attendanceStats.length - 1}
              />
            ))}
          </div>

          {/*Recent Request Table */}
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4 my-3">
              <h2 className="font-bold text-gray-800">Recent Request</h2>
              <button className="text-blue-500 text-sm hover:underline">View All</button>
            </div>
            <hr className="border-b  border-gray-400 mb-3" />
            {/*Table Component នៅទីនេះ */}
            <div className="px-1">
              {displayData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-3 border-b border-gray-400 last:border-0"
                >
                  <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                    <span className="text-gray-600 font-medium">{item.id}</span>
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-gray-500">{item.type}</span>
                    <span className="text-gray-500 text-sm">{item.date}</span>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex gap-2 ml-4">
                    <button className="p-1.5 bg-red-400 text-white rounded-full hover:bg-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <button className="p-1.5 bg-emerald-400 text-white rounded-full hover:bg-emerald-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>  
        </div>

        {/* ផ្នែកខាងស្តាំ (Right Content - Calendar) */}
        <div className="lg:col-span-1">
          <div className=" rounded-2xl h-full">
            <Calendar />
          </div>
        </div>
      </div>

      {/* ផ្នែកខាងក្រោម */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">

        {/* Employee’s on Leave */}
        <div className='lg:col-span-1 space-y-3'>
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4 my-3">
              <h2 className="font-bold text-gray-800">Employee's on Leave</h2>
              <button className="text-blue-500 text-sm hover:underline">View All</button>
            </div>
            <hr className="border-b  border-gray-400 mb-3" />
            {/*Table Component នៅទីនេះ */}
            <div className="px-1">
              {employeesData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  {/*ID*/}
                  <div className="w-20">
                    <span className="text-gray-600 font-medium">{item.id}</span>
                  </div>

                  {/*Name & Role*/}
                  <div className="flex-1 flex flex-col ml-4">
                    <span className="text-gray-800 font-semibold leading-tight">{item.name}</span>
                    <span className="text-gray-400 text-sm">{item.role}</span>        
                  </div>

                  {/*Days*/}
                  <div className="text-right ml-4">
                    <span className="text-gray-500 text-sm whitespace-nowrap">{item.days} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>  
        </div>

        {/* Employee’s on Duty */}
        <div className='lg:col-span-1 space-y-6'>
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4 my-3">
              <h2 className="font-bold text-gray-800">Employee's on Duty</h2>
              <button className="text-blue-500 text-sm hover:underline">View All</button>
            </div>
            <hr className="border-b  border-gray-400 mb-3" />
            {/*Table Component នៅទីនេះ */}
            <div className="px-1">
              {employeesData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center py-3 border-b border-gray-200 last:border-0"
                >
                  {/* 1. ID: កំណត់ទំហំតូចល្មម*/}
                  <div className="w-[20%]">
                    <span className="text-gray-600 font-medium">{item.id}</span>
                  </div>

                  {/* Name & Role */}
                  <div className="w-[55%] flex flex-col">
                    <span className="text-gray-800 font-bold leading-tight">{item.name}</span>
                    <span className="text-gray-400 text-xs">{item.role}</span>        
                  </div>

                  {/* In */}
                  <div className="w-[12.5%] flex flex-col"> 
                    <span className="text-gray-800 font-bold">In</span>
                    <span className="text-gray-500 text-xs">{item.In}</span>
                  </div>
                
                  {/* Out */}
                  <div className="w-[12.5%] flex flex-col">
                    <span className="text-gray-800 font-bold">Out</span>  
                    <span className="text-gray-500 text-xs">{item.Out}</span>
                  </div>
                </div>
              ))}
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}