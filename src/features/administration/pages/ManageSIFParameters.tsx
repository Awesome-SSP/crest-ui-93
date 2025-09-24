import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Save, RefreshCw, Database, Settings, AlertTriangle, Eye, Edit, Trash2, History } from "lucide-react"

const ManageSIFParameters = () => {
    const [activeTab, setActiveTab] = useState("parameters")

    // Mock data for SIF parameters
    const sifParameters = [
        {
            id: "SIF001",
            name: "Max File Size",
            category: "File Processing",
            value: "50MB",
            dataType: "String",
            description: "Maximum file size allowed for SIF processing",
            lastModified: "2024-09-15",
            modifiedBy: "admin",
            status: "Active"
        },
        {
            id: "SIF002",
            name: "Processing Timeout",
            category: "System",
            value: "300",
            dataType: "Integer",
            description: "Timeout in seconds for SIF processing operations",
            lastModified: "2024-09-12",
            modifiedBy: "john.doe",
            status: "Active"
        },
        {
            id: "SIF003",
            name: "Auto Retry Count",
            category: "Error Handling",
            value: "3",
            dataType: "Integer",
            description: "Number of automatic retry attempts for failed operations",
            lastModified: "2024-09-10",
            modifiedBy: "jane.smith",
            status: "Active"
        },
        {
            id: "SIF004",
            name: "Debug Mode",
            category: "System",
            value: "false",
            dataType: "Boolean",
            description: "Enable debug logging for SIF operations",
            lastModified: "2024-09-08",
            modifiedBy: "admin",
            status: "Inactive"
        }
    ]

    // Mock data for parameter categories
    const categories = [
        { name: "File Processing", count: 1, description: "Parameters related to file handling" },
        { name: "System", count: 2, description: "Core system configuration parameters" },
        { name: "Error Handling", count: 1, description: "Error handling and retry mechanisms" },
        { name: "Security", count: 0, description: "Security-related parameters" },
        { name: "Performance", count: 0, description: "Performance optimization settings" }
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Active':
                return <Badge className="bg-green-100 text-green-800">Active</Badge>
            case 'Inactive':
                return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
            case 'Deprecated':
                return <Badge className="bg-red-100 text-red-800">Deprecated</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getDataTypeBadge = (dataType: string) => {
        switch (dataType) {
            case 'String':
                return <Badge variant="outline" className="text-blue-600">String</Badge>
            case 'Integer':
                return <Badge variant="outline" className="text-green-600">Integer</Badge>
            case 'Boolean':
                return <Badge variant="outline" className="text-purple-600">Boolean</Badge>
            case 'Float':
                return <Badge variant="outline" className="text-orange-600">Float</Badge>
            default:
                return <Badge variant="outline">{dataType}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-content-background">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">MANAGE SIF PARAMETERS</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh Cache
                        </Button>
                        <Button variant="outline" size="sm">
                            <Database className="h-4 w-4 mr-2" />
                            Backup Config
                        </Button>
                        <Button size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Add Parameter
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <Card>
                    <CardContent className="p-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                                <TabsTrigger value="categories">Categories</TabsTrigger>
                                <TabsTrigger value="editor">Parameter Editor</TabsTrigger>
                                <TabsTrigger value="history">Change History</TabsTrigger>
                            </TabsList>

                            {/* Parameters Tab */}
                            <TabsContent value="parameters" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="text-2xl font-bold text-blue-600">4</div>
                                            <p className="text-sm text-muted-foreground">Total Parameters</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="text-2xl font-bold text-green-600">3</div>
                                            <p className="text-sm text-muted-foreground">Active Parameters</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="text-2xl font-bold text-gray-600">1</div>
                                            <p className="text-sm text-muted-foreground">Inactive Parameters</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="text-2xl font-bold text-purple-600">3</div>
                                            <p className="text-sm text-muted-foreground">Categories</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Filters */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="filterCategory">Filter by Category</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Categories" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Categories</SelectItem>
                                                <SelectItem value="file-processing">File Processing</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                                <SelectItem value="error-handling">Error Handling</SelectItem>
                                                <SelectItem value="security">Security</SelectItem>
                                                <SelectItem value="performance">Performance</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="filterStatus">Filter by Status</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Statuses" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Statuses</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                <SelectItem value="deprecated">Deprecated</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="filterDataType">Filter by Data Type</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Types" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Types</SelectItem>
                                                <SelectItem value="string">String</SelectItem>
                                                <SelectItem value="integer">Integer</SelectItem>
                                                <SelectItem value="boolean">Boolean</SelectItem>
                                                <SelectItem value="float">Float</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Parameter ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Current Value</TableHead>
                                            <TableHead>Data Type</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Last Modified</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sifParameters.map((param) => (
                                            <TableRow key={param.id}>
                                                <TableCell className="font-medium">{param.id}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{param.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {param.description}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{param.category}</TableCell>
                                                <TableCell>
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                        {param.value}
                                                    </code>
                                                </TableCell>
                                                <TableCell>{getDataTypeBadge(param.dataType)}</TableCell>
                                                <TableCell>{getStatusBadge(param.status)}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="text-sm">{param.lastModified}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            by {param.modifiedBy}
                                                        </div>
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
                                                            <History className="h-4 w-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will permanently delete the parameter "{param.name}". This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>

                            {/* Categories Tab */}
                            <TabsContent value="categories" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categories.map((category) => (
                                        <Card key={category.name}>
                                            <CardHeader>
                                                <CardTitle className="text-lg flex items-center justify-between">
                                                    {category.name}
                                                    <Badge variant="secondary">{category.count}</Badge>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    {category.description}
                                                </p>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm">View Parameters</Button>
                                                    <Button variant="outline" size="sm">Edit Category</Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            {/* Parameter Editor Tab */}
                            <TabsContent value="editor" className="space-y-6 mt-6">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="paramName">Parameter Name *</Label>
                                            <Input id="paramName" placeholder="Enter parameter name" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="paramCategory">Category *</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="file-processing">File Processing</SelectItem>
                                                    <SelectItem value="system">System</SelectItem>
                                                    <SelectItem value="error-handling">Error Handling</SelectItem>
                                                    <SelectItem value="security">Security</SelectItem>
                                                    <SelectItem value="performance">Performance</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="paramDataType">Data Type *</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select data type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="string">String</SelectItem>
                                                    <SelectItem value="integer">Integer</SelectItem>
                                                    <SelectItem value="boolean">Boolean</SelectItem>
                                                    <SelectItem value="float">Float</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="paramValue">Parameter Value *</Label>
                                            <Input id="paramValue" placeholder="Enter parameter value" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="paramDescription">Description</Label>
                                        <Textarea
                                            id="paramDescription"
                                            placeholder="Enter parameter description..."
                                            rows={3}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch id="paramActive" />
                                        <Label htmlFor="paramActive">Parameter is active</Label>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <div className="flex items-start space-x-2">
                                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-yellow-800">
                                                    Warning: Parameter Changes
                                                </p>
                                                <p className="text-sm text-yellow-700 mt-1">
                                                    Changing SIF parameters may affect system behavior. Please ensure you understand the impact before making changes.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline">Reset Form</Button>
                                        <Button variant="outline">Validate Parameter</Button>
                                        <Button>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Parameter
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Change History Tab */}
                            <TabsContent value="history" className="space-y-6 mt-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium">Parameter Change History</h3>
                                        <Button variant="outline" size="sm">
                                            Export History
                                        </Button>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date/Time</TableHead>
                                                <TableHead>Parameter</TableHead>
                                                <TableHead>Action</TableHead>
                                                <TableHead>Old Value</TableHead>
                                                <TableHead>New Value</TableHead>
                                                <TableHead>Modified By</TableHead>
                                                <TableHead>Reason</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>2024-09-15 10:30 AM</TableCell>
                                                <TableCell>Max File Size</TableCell>
                                                <TableCell>
                                                    <Badge className="bg-blue-100 text-blue-800">Updated</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">25MB</code>
                                                </TableCell>
                                                <TableCell>
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">50MB</code>
                                                </TableCell>
                                                <TableCell>admin</TableCell>
                                                <TableCell>Increased limit for large file processing</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>2024-09-12 02:15 PM</TableCell>
                                                <TableCell>Processing Timeout</TableCell>
                                                <TableCell>
                                                    <Badge className="bg-blue-100 text-blue-800">Updated</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">180</code>
                                                </TableCell>
                                                <TableCell>
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">300</code>
                                                </TableCell>
                                                <TableCell>john.doe</TableCell>
                                                <TableCell>Extended timeout for complex operations</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>2024-09-10 11:45 AM</TableCell>
                                                <TableCell>Auto Retry Count</TableCell>
                                                <TableCell>
                                                    <Badge className="bg-green-100 text-green-800">Created</Badge>
                                                </TableCell>
                                                <TableCell>-</TableCell>
                                                <TableCell>
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">3</code>
                                                </TableCell>
                                                <TableCell>jane.smith</TableCell>
                                                <TableCell>Added automatic retry mechanism</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ManageSIFParameters