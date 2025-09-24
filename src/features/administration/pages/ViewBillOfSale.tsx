import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Plus } from "lucide-react"

const ViewBillOfSale = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    // Mock data for demonstration
    const billsOfSale = [
        {
            id: "BOS001",
            companyName: "ABC Corp",
            date: "2024-09-15",
            amount: "$25,000.00",
            status: "Completed",
            type: "Asset Purchase"
        },
        {
            id: "BOS002",
            companyName: "XYZ LLC",
            date: "2024-09-10",
            amount: "$15,500.00",
            status: "Pending",
            type: "Equipment Sale"
        },
        {
            id: "BOS003",
            companyName: "Tech Solutions Inc",
            date: "2024-09-08",
            amount: "$42,300.00",
            status: "Completed",
            type: "Business Sale"
        }
    ]

    return (
        <div className="min-h-screen bg-content-background">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">VIEW BILL OF SALE</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            New Bill of Sale
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Search & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="search"
                                        placeholder="Search by company name, ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dateRange">Date Range</Label>
                                <Input
                                    id="dateRange"
                                    type="date"
                                />
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

                {/* Results Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Bills of Sale</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Bill ID</TableHead>
                                    <TableHead>Company Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {billsOfSale.map((bill) => (
                                    <TableRow key={bill.id}>
                                        <TableCell className="font-medium">{bill.id}</TableCell>
                                        <TableCell>{bill.companyName}</TableCell>
                                        <TableCell>{bill.date}</TableCell>
                                        <TableCell>{bill.amount}</TableCell>
                                        <TableCell>{bill.type}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${bill.status === 'Completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {bill.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">View</Button>
                                                <Button variant="outline" size="sm">Edit</Button>
                                                <Button variant="outline" size="sm">Download</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-sm text-muted-foreground">
                                Showing 1 to 3 of 3 results
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

export default ViewBillOfSale