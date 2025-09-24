import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, Mail, Phone } from "lucide-react"

const ViewContact = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCompany, setFilterCompany] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")

    // Mock data for demonstration
    const contacts = [
        {
            id: "CNT001",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@abccorp.com",
            phone: "+1 (555) 123-4567",
            company: "ABC Corp",
            jobTitle: "Software Engineer",
            department: "Engineering",
            status: "Active",
            lastContact: "2024-09-15",
            tags: ["VIP", "Technical"]
        },
        {
            id: "CNT002",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@xyzllc.com",
            phone: "+1 (555) 234-5678",
            company: "XYZ LLC",
            jobTitle: "Project Manager",
            department: "Operations",
            status: "Active",
            lastContact: "2024-09-12",
            tags: ["Decision Maker"]
        },
        {
            id: "CNT003",
            firstName: "Bob",
            lastName: "Johnson",
            email: "bob.johnson@techsolutions.com",
            phone: "+1 (555) 345-6789",
            company: "Tech Solutions Inc",
            jobTitle: "CTO",
            department: "Executive",
            status: "Inactive",
            lastContact: "2024-08-28",
            tags: ["Executive", "VIP"]
        },
        {
            id: "CNT004",
            firstName: "Alice",
            lastName: "Brown",
            email: "alice.brown@globalservices.com",
            phone: "+1 (555) 456-7890",
            company: "Global Services",
            jobTitle: "Account Manager",
            department: "Sales",
            status: "Active",
            lastContact: "2024-09-14",
            tags: ["Sales", "Primary Contact"]
        }
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Active':
                return <Badge className="bg-green-100 text-green-800">Active</Badge>
            case 'Inactive':
                return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
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
                    <h1 className="text-2xl font-bold tracking-tight">VIEW CONTACT</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Contacts
                        </Button>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Contact
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-green-600">3</div>
                            <p className="text-sm text-muted-foreground">Active Contacts</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-gray-600">1</div>
                            <p className="text-sm text-muted-foreground">Inactive Contacts</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">4</div>
                            <p className="text-sm text-muted-foreground">Total Contacts</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-purple-600">3</div>
                            <p className="text-sm text-muted-foreground">Companies</p>
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
                                        placeholder="Search by name, email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Select value={filterCompany} onValueChange={setFilterCompany}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Companies" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Companies</SelectItem>
                                        <SelectItem value="abc-corp">ABC Corp</SelectItem>
                                        <SelectItem value="xyz-llc">XYZ LLC</SelectItem>
                                        <SelectItem value="tech-solutions">Tech Solutions Inc</SelectItem>
                                        <SelectItem value="global-services">Global Services</SelectItem>
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
                                        <SelectItem value="engineering">Engineering</SelectItem>
                                        <SelectItem value="sales">Sales</SelectItem>
                                        <SelectItem value="operations">Operations</SelectItem>
                                        <SelectItem value="executive">Executive</SelectItem>
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

                {/* Contacts Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Directory</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Contact</TableHead>
                                    <TableHead>Tags</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarFallback>
                                                        {getInitials(contact.firstName, contact.lastName)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">
                                                        {contact.firstName} {contact.lastName}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {contact.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                                {contact.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                                {contact.phone}
                                            </div>
                                        </TableCell>
                                        <TableCell>{contact.company}</TableCell>
                                        <TableCell>{contact.jobTitle}</TableCell>
                                        <TableCell>{contact.department}</TableCell>
                                        <TableCell>{getStatusBadge(contact.status)}</TableCell>
                                        <TableCell>{contact.lastContact}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {contact.tags.map((tag) => (
                                                    <Badge key={tag} variant="outline" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
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

export default ViewContact