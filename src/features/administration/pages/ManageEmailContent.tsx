import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Save, Eye, Edit, Trash2, Plus, Upload, Download, FileText } from "lucide-react"

const ManageEmailContent = () => {
    const [activeTab, setActiveTab] = useState("templates")

    // Mock data for email templates
    const emailTemplates = [
        {
            id: "TMPL001",
            name: "Welcome Email",
            subject: "Welcome to Our Service",
            type: "Notification",
            status: "Active",
            lastModified: "2024-09-15",
            usage: 45
        },
        {
            id: "TMPL002",
            name: "Invoice Reminder",
            subject: "Invoice Payment Reminder",
            type: "Billing",
            status: "Active",
            lastModified: "2024-09-12",
            usage: 23
        },
        {
            id: "TMPL003",
            name: "System Maintenance",
            subject: "Scheduled System Maintenance Notice",
            type: "System",
            status: "Draft",
            lastModified: "2024-09-10",
            usage: 0
        }
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Active':
                return <Badge className="bg-green-100 text-green-800">Active</Badge>
            case 'Draft':
                return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
            case 'Archived':
                return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-content-background">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">MANAGE EMAIL CONTENT</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Templates
                        </Button>
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Import Templates
                        </Button>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            New Template
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <Card>
                    <CardContent className="p-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="templates">Email Templates</TabsTrigger>
                                <TabsTrigger value="editor">Template Editor</TabsTrigger>
                                <TabsTrigger value="settings">Email Settings</TabsTrigger>
                                <TabsTrigger value="logs">Send Logs</TabsTrigger>
                            </TabsList>

                            {/* Email Templates Tab */}
                            <TabsContent value="templates" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="text-2xl font-bold text-blue-600">3</div>
                                            <p className="text-sm text-muted-foreground">Total Templates</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="text-2xl font-bold text-green-600">2</div>
                                            <p className="text-sm text-muted-foreground">Active Templates</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="text-2xl font-bold text-yellow-600">1</div>
                                            <p className="text-sm text-muted-foreground">Draft Templates</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="text-2xl font-bold text-purple-600">68</div>
                                            <p className="text-sm text-muted-foreground">Total Usage</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Template ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Last Modified</TableHead>
                                            <TableHead>Usage Count</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {emailTemplates.map((template) => (
                                            <TableRow key={template.id}>
                                                <TableCell className="font-medium">{template.id}</TableCell>
                                                <TableCell>{template.name}</TableCell>
                                                <TableCell>{template.subject}</TableCell>
                                                <TableCell>{template.type}</TableCell>
                                                <TableCell>{getStatusBadge(template.status)}</TableCell>
                                                <TableCell>{template.lastModified}</TableCell>
                                                <TableCell>{template.usage}</TableCell>
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
                            </TabsContent>

                            {/* Template Editor Tab */}
                            <TabsContent value="editor" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="templateName">Template Name *</Label>
                                        <Input id="templateName" placeholder="Enter template name" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="templateType">Template Type</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="notification">Notification</SelectItem>
                                                <SelectItem value="billing">Billing</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                <SelectItem value="support">Support</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="emailSubject">Email Subject *</Label>
                                        <Input id="emailSubject" placeholder="Enter email subject" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="emailContent">Email Content *</Label>
                                    <Textarea
                                        id="emailContent"
                                        placeholder="Enter email content with placeholders like {{name}}, {{company}}, etc."
                                        rows={12}
                                        className="font-mono"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Available Variables</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        <Badge variant="outline">{{ name }}</Badge>
                                        <Badge variant="outline">{{ email }}</Badge>
                                        <Badge variant="outline">{{ company }}</Badge>
                                        <Badge variant="outline">{{ date }}</Badge>
                                        <Badge variant="outline">{{ amount }}</Badge>
                                        <Badge variant="outline">{{ invoice_number }}</Badge>
                                        <Badge variant="outline">{{ due_date }}</Badge>
                                        <Badge variant="outline">{{ support_link }}</Badge>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline">Preview</Button>
                                    <Button variant="outline">Save as Draft</Button>
                                    <Button>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Template
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Email Settings Tab */}
                            <TabsContent value="settings" className="space-y-6 mt-6">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">SMTP Configuration</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="smtpHost">SMTP Host</Label>
                                                <Input id="smtpHost" placeholder="smtp.gmail.com" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="smtpPort">SMTP Port</Label>
                                                <Input id="smtpPort" placeholder="587" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="smtpUsername">Username</Label>
                                                <Input id="smtpUsername" placeholder="your-email@domain.com" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="smtpPassword">Password</Label>
                                                <Input id="smtpPassword" type="password" placeholder="••••••••" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Default Settings</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="fromEmail">Default From Email</Label>
                                                <Input id="fromEmail" placeholder="noreply@company.com" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="fromName">Default From Name</Label>
                                                <Input id="fromName" placeholder="Company Name" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="replyTo">Reply-To Email</Label>
                                                <Input id="replyTo" placeholder="support@company.com" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="bccEmail">BCC Email</Label>
                                                <Input id="bccEmail" placeholder="admin@company.com" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Email Limits</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="dailyLimit">Daily Limit</Label>
                                                <Input id="dailyLimit" placeholder="1000" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="hourlyLimit">Hourly Limit</Label>
                                                <Input id="hourlyLimit" placeholder="100" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="retryAttempts">Retry Attempts</Label>
                                                <Input id="retryAttempts" placeholder="3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline">Test Connection</Button>
                                    <Button>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Settings
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Send Logs Tab */}
                            <TabsContent value="logs" className="space-y-6 mt-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium">Recent Email Logs</h3>
                                        <Button variant="outline" size="sm">
                                            <FileText className="h-4 w-4 mr-2" />
                                            Export Logs
                                        </Button>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date/Time</TableHead>
                                                <TableHead>Template</TableHead>
                                                <TableHead>Recipient</TableHead>
                                                <TableHead>Subject</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Error</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>2024-09-15 10:30 AM</TableCell>
                                                <TableCell>Welcome Email</TableCell>
                                                <TableCell>john.doe@company.com</TableCell>
                                                <TableCell>Welcome to Our Service</TableCell>
                                                <TableCell>
                                                    <Badge className="bg-green-100 text-green-800">Sent</Badge>
                                                </TableCell>
                                                <TableCell>-</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>2024-09-15 09:15 AM</TableCell>
                                                <TableCell>Invoice Reminder</TableCell>
                                                <TableCell>jane.smith@company.com</TableCell>
                                                <TableCell>Invoice Payment Reminder</TableCell>
                                                <TableCell>
                                                    <Badge className="bg-red-100 text-red-800">Failed</Badge>
                                                </TableCell>
                                                <TableCell>Invalid email address</TableCell>
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

export default ManageEmailContent