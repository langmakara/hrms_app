import { redirect } from 'next/navigation';

export default function RootPage() {
  // នៅពេល User បើកមកទំព័រដើម វានឹងរុញទៅ /login ភ្លាម
  redirect('/login');
  
  // មិនចាំបាច់ return អ្វីឡើយ ព្រោះវានឹងផ្លាស់ប្តូរទំព័រមុនពេល Render
}