import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "+20.1% from last month",
      icon: <DollarSign className="h-4 w-4 text-violet-600" />,
    },
    {
      title: "Total Users",
      value: "2,350",
      description: "+180.1% from last month",
      icon: <Users className="h-4 w-4 text-violet-600" />,
    },
    {
      title: "Active Orders",
      value: "12,234",
      description: "+19% from last month",
      icon: <ShoppingCart className="h-4 w-4 text-violet-600" />,
    },
    {
      title: "Growth Rate",
      value: "15.3%",
      description: "+201 since last hour",
      icon: <TrendingUp className="h-4 w-4 text-violet-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-gray-500">Welcome back to your dashboard overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Monthly revenue and user statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-md">
              Chart placeholder
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest user actions and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-violet-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
