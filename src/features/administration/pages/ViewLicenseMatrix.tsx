import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Plus, Eye, Edit } from "lucide-react"

const ViewLicenseMatrix = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterState, setFilterState] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")

    // Mock data for demonstration
    const licenses = [
        {
            id: "LIC001",
            companyName: "ABC Corp",
            licenseType: "Business License",
            state: "California",
            issueDate: "2024-01-15",
            expiryDate: "2025-01-15",
            status: "Active",
            renewalRequired: false
        },
        {
            id: "LIC002",
            companyName: "XYZ LLC",
            licenseType: "Professional License",
            state: "Texas",
            issueDate: "2023-06-20",
            expiryDate: "2024-10-15",
            status: "Expiring Soon",
            renewalRequired: true
        },
        {
            id: "LIC003",
            companyName: "Tech Solutions Inc",
            licenseType: "Contractor License",
            state: "New York",
            issueDate: "2023-03-10",
            expiryDate: "2024-09-30",
            status: "Expired",
            renewalRequired: true
        },
        {
            id: "LIC004",
            companyName: "Global Services",
            licenseType: "Operating License",
            state: "Florida",
            issueDate: "2024-02-28",
            expiryDate: "2025-02-28",
            status: "Active",
            renewalRequired: false
        }
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Active':
                return <Badge className="bg-green-100 text-green-800">Active</Badge>
            case 'Expiring Soon':
                return <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>
            case 'Expired':
                return <Badge className="bg-red-100 text-red-800">Expired</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-content-background">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">VIEW LICENSE MATRIX</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Matrix
                        </Button>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add License
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-green-600">2</div>
                            <p className="text-sm text-muted-foreground">Active Licenses</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-yellow-600">1</div>
                            <p className="text-sm text-muted-foreground">Expiring Soon</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-red-600">1</div>
                            <p className="text-sm text-muted-foreground">Expired</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">4</div>
                            <p className="text-sm text-muted-foreground">Total Licenses</p>
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
                                        placeholder="Search by company, license..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Select value={filterState} onValueChange={setFilterState}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All States" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All States</SelectItem>
                                        <SelectItem value="california">California</SelectItem>
                                        <SelectItem value="texas">Texas</SelectItem>
                                        <SelectItem value="newyork">New York</SelectItem>
                                        <SelectItem value="florida">Florida</SelectItem>
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
                                        <SelectItem value="expiring">Expiring Soon</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="licenseType">License Type</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="business">Business License</SelectItem>
                                        <SelectItem value="professional">Professional License</SelectItem>
                                        <SelectItem value="contractor">Contractor License</SelectItem>
                                        <SelectItem value="operating">Operating License</SelectItem>
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

                {/* License Matrix Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>License Matrix</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>License ID</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>License Type</TableHead>
                                    <TableHead>State</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Expiry Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Renewal</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {licenses.map((license) => (
                                    <TableRow key={license.id}>
                                        <TableCell className="font-medium">{license.id}</TableCell>
                                        <TableCell>{license.companyName}</TableCell>
                                        <TableCell>{license.licenseType}</TableCell>
                                        <TableCell>{license.state}</TableCell>
                                        <TableCell>{license.issueDate}</TableCell>
                                        <TableCell>{license.expiryDate}</TableCell>
                                        <TableCell>{getStatusBadge(license.status)}</TableCell>
                                        <TableCell>
                                            {license.renewalRequired ? (
                                                <Badge variant="outline" className="text-orange-600">Required</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-gray-600">Not Required</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                {license.renewalRequired && (
                                                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                                        Renew
                                                    </Button>
                                                )}
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

export default ViewLicenseMatrix