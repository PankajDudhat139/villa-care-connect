"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManagerDashboard() {
  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Manager Dashboard</h1>
      </div>
      <Tabs defaultValue="requests">
        <TabsList className="">
          <TabsTrigger className="cursor-pointer" value="requests">
            Maintenance Request
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="accounts">
            User Accounts
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="partners">
            External Partners
          </TabsTrigger>
        </TabsList>
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Maintenance Requests</CardTitle>
                <Button>New Request</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">Customer</th>
                      <th className="py-2 px-4 text-left">Issue</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "REQ001",
                        customer: "John Doe",
                        issue: "Plumbing",
                        status: "Pending",
                      },
                      {
                        id: "REQ002",
                        customer: "Jane Smith",
                        issue: "Electrical",
                        status: "In Progress",
                      },
                      {
                        id: "REQ003",
                        customer: "Mike Johnson",
                        issue: "HVAC",
                        status: "Completed",
                      },
                    ].map((request) => (
                      <tr
                        key={request.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-2 px-4">{request.id}</td>
                        <td className="py-2 px-4">{request.customer}</td>
                        <td className="py-2 px-4">{request.issue}</td>
                        <td className="py-2 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              request.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : request.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="py-2 px-4"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Accounts</CardTitle>
                <Button>Add User</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "John Doe",
                    role: "Customer",
                    email: "john@example.com",
                  },
                  {
                    name: "Sarah Tech",
                    role: "Technician",
                    email: "sarah@example.com",
                  },
                  {
                    name: "Mike Admin",
                    role: "Manager",
                    email: "mike@example.com",
                  },
                ].map((user, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {user.name[0]}
                      </div>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>External Partners</CardTitle>
                <Button>Add Partner</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "ABC Plumbing",
                    type: "Plumbing",
                    rating: 4.5,
                    jobs: 156,
                  },
                  {
                    name: "XYZ Electric",
                    type: "Electrical",
                    rating: 4.8,
                    jobs: 230,
                  },
                  {
                    name: "Cool Air Services",
                    type: "HVAC",
                    rating: 4.2,
                    jobs: 98,
                  },
                ].map((partner, index) => (
                  <div
                    key={index}
                    className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {partner.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {partner.type} Services
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span>{partner.rating}</span>
                          <span className="text-gray-400">|</span>
                          <span>{partner.jobs} jobs</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
