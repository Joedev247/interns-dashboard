import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, ResponsiveContainer, 
  XAxis, YAxis, Tooltip, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  Package, MessageSquare, Users,
  LogOut, Bell, TrendingUp, CreditCard, 
  Cpu, Layers, Briefcase
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Stat {
  title: string;
  value: number;
  change: string;
  icon: React.ReactElement;
  color: string;
}

interface RevenueDataPoint {
  name: string;
  value: number;
}

interface CategoryDataPoint {
  name: string;
  value: number;
}

interface Activity {
  icon: React.ReactElement;
  title: string;
  time: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataPoint[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch('https://dummyjson.com/products');
        const productData = await productResponse.json();
        const totalProducts = productData.total;

        const postResponse = await fetch('https://dummyjson.com/posts');
        const postData = await postResponse.json();
        const totalPosts = postData.total;

        const commentResponse = await fetch('https://dummyjson.com/comments');
        const commentData = await commentResponse.json();
        const totalComments = commentData.total;

        const userResponse = await fetch('https://dummyjson.com/users');
        const userData = await userResponse.json();
        const totalUsers = userData.total;

        const statsData: Stat[] = [
          { 
            title: 'Total Products', 
            value: totalProducts, 
            change: '+12.5%', 
            icon: <Package className="text-violet-600" size={24} />,
            color: 'bg-violet-50'
          },
          { 
            title: 'Total Posts', 
            value: totalPosts, 
            change: '+8.2%',
            icon: <MessageSquare className="text-indigo-600" size={24} />,
            color: 'bg-indigo-50'
          },
          { 
            title: 'Total Comments', 
            value: totalComments, 
            change: '-3.1%',
            icon: <TrendingUp className="text-emerald-600" size={24} />,
            color: 'bg-emerald-50'
          },
          { 
            title: 'Total Users', 
            value: totalUsers, 
            change: '+6.4%',
            icon: <Users className="text-rose-600" size={24} />,
            color: 'bg-rose-50'
          }
        ];

        const revenueDataPoints: RevenueDataPoint[] = [
          { name: 'Jan', value: 4000 },
          { name: 'Feb', value: 3000 },
          { name: 'Mar', value: 2000 },
          { name: 'Apr', value: 2780 },
          { name: 'May', value: 1890 },
          { name: 'Jun', value: 2390 }
        ];

        const categoryDataPoints: CategoryDataPoint[] = [
          { name: 'Electronics', value: productData.products.filter((product: any) => product.category === 'smartphones').length },
          { name: 'Apparel', value: productData.products.filter((product: any) => product.category === 'womens-dresses').length },
          { name: 'Home Goods', value: productData.products.filter((product: any) => product.category === 'home-decoration').length },
          { name: 'Books', value: productData.products.filter((product: any) => product.category === 'groceries').length }
        ];

        const activitiesData: Activity[] = [
          { 
            icon: <Cpu size={18} />,
            title: 'New server deployed',
            time: '2 minutes ago'
          },
          {
            icon: <Layers size={18} />,
            title: 'New product added',
            time: '15 minutes ago'  
          },
          {
            icon: <Briefcase size={18} />,
            title: 'New order received',
            time: '1 hour ago'
          }
        ];

        setStats(statsData);
        setRevenueData(revenueDataPoints);
        setCategoryData(categoryDataPoints);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, Emily Johnson!</h1>
          <p className="text-gray-500">Here's what's happening with your store today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={cn(
              "bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow",
              stat.color
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-white shadow-sm">
                {stat.icon}
              </div>
              <span className={`inline-block text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Revenue Trend</h3>
            <select className="border-none bg-gray-100 rounded-lg px-3 py-2 text-sm">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#7c3aed"
                fill="url(#colorRevenue)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Category Breakdown</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={categoryData} 
                dataKey="value"
                nameKey="name"
                cx="50%" 
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {categoryData.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={['#7c3aed', '#4338ca', '#6366f1', '#a855f7'][index]}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
