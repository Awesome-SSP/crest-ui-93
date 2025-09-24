import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Plus, Eye, Edit, Trash2, Key, Shield, User, Settings } from "lucide-react"

const ManageUser = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterRole, setFilterRole] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")

    // Mock data for demonstration
    const users = [
        {
            id: "USR001",
            username: "john.doe",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@company.com",
            role: "Administrator",
            department: "IT",
            status: "Active",
            lastLogin: "2024-09-15 10:30 AM",
            permissions: ["Admin", "Finance", "Reports"],
            createdDate: "2024-01-15"
        },
        {
            id: "USR002",
            username: "jane.smith",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@company.com",
            role: "Manager",
            department: "Operations",
            status: "Active",
            lastLogin: "2024-09-15 09:15 AM",
            permissions: ["Reports", "Inventory", "Support"],
            createdDate: "2024-02-20"
        },
        {
            id: "USR003",
            username: "bob.johnson",
            firstName: "Bob",
            lastName: "Johnson",
            email: "bob.johnson@company.com",
            role: "User",
            department: "Sales",
            status: "Inactive",
            lastLogin: "2024-09-10 02:45 PM",
            permissions: ["Reports"],
            createdDate: "2024-03-10"
        },
        {
            id: "USR004",
            username: "alice.brown",
            firstName: "Alice",
            lastName: "Brown",
            email: "alice.brown@company.com",
            role: "Supervisor",
            department: "Finance",
            status: "Active",
            lastLogin: "2024-09-15 11:20 AM",
            permissions: ["Finance", "Reports", "Administration"],
            createdDate: "2024-01-30"
        }
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Active':
                return <Badge className="bg-green-100 text-green-800">Active</Badge>
            case 'Inactive':
                return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
            case 'Suspended':
                return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'Administrator':
                return <Badge className="bg-purple-100 text-purple-800">Administrator</Badge>
            case 'Manager':
                return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>
            case 'Supervisor':
                return <Badge className="bg-orange-100 text-orange-800">Supervisor</Badge>
            case 'User':
                return <Badge className="bg-gray-100 text-gray-800">User</Badge>
            default:
                return <Badge variant="secondary">{role}</Badge>
        }
    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`
    }

    return (
        <div className="min-h-screen bg-content-background">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">MANAGE USER</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Bulk Actions
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add User
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Add New User</DialogTitle>
                                </DialogHeader>
                                <Tabs defaultValue="basic" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                                        <TabsTrigger value="access">Access & Role</TabsTrigger>
                                        <TabsTrigger value="permissions">Permissions</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="basic" className="space-y-4 mt-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name *</Label>
                                                <Input id="firstName" placeholder="Enter first name" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name *</Label>
                                                <Input id="lastName" placeholder="Enter last name" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="username">Username *</Label>
                                                <Input id="username" placeholder="Enter username" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email *</Label>
                                                <Input id="email" type="email" placeholder="user@company.com" />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="access" className="space-y-4 mt-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="role">Role *</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="administrator">Administrator</SelectItem>
                                                        <SelectItem value="manager">Manager</SelectItem>
                                                        <SelectItem value="supervisor">Supervisor</SelectItem>
                                                        <SelectItem value="user">User</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="department">Department</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select department" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="it">IT</SelectItem>
                                                        <SelectItem value="operations">Operations</SelectItem>
                                                        <SelectItem value="sales">Sales</SelectItem>
                                                        <SelectItem value="finance">Finance</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="permissions" className="space-y-4 mt-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="adminAccess" />
                                                    <Label htmlFor="adminAccess">Administration</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="financeAccess" />
                                                    <Label htmlFor="financeAccess">Finance</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="reportsAccess" />
                                                    <Label htmlFor="reportsAccess">Reports</Label>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="inventoryAccess" />
                                                    <Label htmlFor="inventoryAccess">Inventory</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="supportAccess" />
                                                    <Label htmlFor="supportAccess">Support</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="settingsAccess" />
                                                    <Label htmlFor="settingsAccess">Settings</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                                <div className="flex justify-end space-x-2 mt-6">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Create User</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-green-600">3</div>
                            <p className="text-sm text-muted-foreground">Active Users</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-gray-600">1</div>
                            <p className="text-sm text-muted-foreground">Inactive Users</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-purple-600">1</div>
                            <p className="text-sm text-muted-foreground">Administrators</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">4</div>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Search & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="search"
                                        placeholder="Search by name, username..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={filterRole} onValueChange={setFilterRole}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Roles" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Roles</SelectItem>
                                        <SelectItem value="administrator">Administrator</SelectItem>
                                        <SelectItem value="manager">Manager</SelectItem>
                                        <SelectItem value="supervisor">Supervisor</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Departments" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Departments</SelectItem>
                                        <SelectItem value="it">IT</SelectItem>
                                        <SelectItem value="operations">Operations</SelectItem>
                                        <SelectItem value="sales">Sales</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4 space-x-2">
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" />
                                Clear Filters
                            </Button>
                            <Button size="sm">
                                Apply Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Login</TableHead>
                                    <TableHead>Permissions</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarFallback>
                                                        {getInitials(user.firstName, user.lastName)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {user.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                                        <TableCell>{user.department}</TableCell>
                                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                                        <TableCell>{user.lastLogin}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.permissions.slice(0, 2).map((permission) => (
                                                    <Badge key={permission} variant="outline" className="text-xs">
                                                        {permission}
                                                    </Badge>
                                                ))}
                                                {user.permissions.length > 2 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{user.permissions.length - 2}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Key className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-sm text-muted-foreground">
                                Showing 1 to 4 of 4 results
                            </p>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button variant="outline" size="sm" disabled>Next</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ManageUser