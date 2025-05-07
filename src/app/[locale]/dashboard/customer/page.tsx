"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomerDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");

  const categories = [
    { id: "ac", name: "AC" },
    { id: "electrical", name: "Electrical" },
    { id: "plumbing", name: "Plumbing" },
    { id: "interior", name: "Interior" },
  ];

  const mockRequests = [
    { id: 1, category: "AC", status: "pending", date: "2024-01-20" },
    { id: 2, category: "Plumbing", status: "in-progress", date: "2024-01-19" },
  ];

  const handleSubmitRequest = () => {
    // Implement submission logic here
    console.log({ category: selectedCategory, description });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Customer Dashboard</h1>

      <Tabs defaultValue="request" className="w-full">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="request">
            New Request
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="status">
            Request Status
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="contracts">
            Contracts
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="chat">
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle>Submit Maintenance Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Describe your issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button onClick={handleSubmitRequest}>Submit Request</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Request Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {mockRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border-b"
                  >
                    <div>
                      <p className="font-medium">{request.category}</p>
                      <p className="text-sm text-gray-500">{request.date}</p>
                    </div>
                    <Badge
                      variant={
                        request.status === "pending" ? "secondary" : "default"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add contracts content here */}
              <p>Your active maintenance contracts will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Chat System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-lg p-4">
                {/* Add chat implementation here */}
                <p className="text-center text-gray-500">
                  Chat with technicians and managers
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
