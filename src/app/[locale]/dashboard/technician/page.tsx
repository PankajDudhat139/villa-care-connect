"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MapPin, Upload, Wrench } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Task {
  id: string;
  clientName: string;
  address: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  date: string;
}

export default function TechnicianDashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      clientName: "John Doe",
      address: "123 Main St",
      description: "AC Repair",
      status: "pending",
      date: "2024-01-20",
    },
    // Add more mock tasks as needed
  ]);

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Technician Dashboard</h1>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="tasks">
            Assigned Tasks
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="reports">
            Work Reports
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="tools">
            Tools & Materials
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="map">
            Client Locations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.clientName}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>
                      <select
                        className="border rounded p-1"
                        value={task.status}
                        onChange={(e) =>
                          updateTaskStatus(
                            task.id,
                            e.target.value as Task["status"]
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        <MapPin className="w-4 h-4 mr-1" /> View Location
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-1" /> Upload Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input type="file" accept="image/*,.pdf" />
                <Button>
                  <Upload className="w-4 h-4 mr-2" /> Upload Report
                </Button>
              </div>
              {/* Add report list here */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input placeholder="Search tools..." />
                <Button>
                  <Wrench className="w-4 h-4 mr-2" /> Add Tool
                </Button>
              </div>
              {/* Add tools list here */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card className="p-4">
            <div className="h-[400px] bg-gray-100 rounded flex items-center justify-center">
              Map Integration Goes Here
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
