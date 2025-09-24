import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Save, X, Upload, User, Phone, Mail, MapPin } from "lucide-react"

const AddContact = () => {
    const [activeTab, setActiveTab] = useState("personal")

    return (
        <div className="min-h-screen bg-content-background">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">ADD CONTACT</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                        <Button size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Save Contact
                        </Button>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardContent className="p-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                <TabsTrigger value="contact">Contact Details</TabsTrigger>
                                <TabsTrigger value="professional">Professional</TabsTrigger>
                                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                            </TabsList>

                            {/* Personal Information Tab */}
                            <TabsContent value="personal" className="space-y-6 mt-6">
                                <div className="flex items-center space-x-6 mb-6">
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                                            <User className="h-12 w-12 text-gray-400" />
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload Photo
                                        </Button>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name *</Label>
                                            <Input id="firstName" placeholder="Enter first name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name *</Label>
                                            <Input id="lastName" placeholder="Enter last name" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="middleName">Middle Name</Label>
                                        <Input id="middleName" placeholder="Enter middle name" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="suffix">Suffix</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select suffix" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="jr">Jr.</SelectItem>
                                                <SelectItem value="sr">Sr.</SelectItem>
                                                <SelectItem value="ii">II</SelectItem>
                                                <SelectItem value="iii">III</SelectItem>
                                                <SelectItem value="iv">IV</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="preferredName">Preferred Name</Label>
                                        <Input id="preferredName" placeholder="How they prefer to be called" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                        <Input id="dateOfBirth" type="date" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="maritalStatus">Marital Status</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="single">Single</SelectItem>
                                                <SelectItem value="married">Married</SelectItem>
                                                <SelectItem value="divorced">Divorced</SelectItem>
                                                <SelectItem value="widowed">Widowed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="personalNotes">Personal Notes</Label>
                                    <Textarea
                                        id="personalNotes"
                                        placeholder="Any personal notes or preferences..."
                                        rows={3}
                                    />
                                </div>
                            </TabsContent>

                            {/* Contact Details Tab */}
                            <TabsContent value="contact" className="space-y-6 mt-6">
                                <div className="space-y-6">
                                    {/* Primary Contact */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium flex items-center">
                                            <Mail className="h-5 w-5 mr-2" />
                                            Email Addresses
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="primaryEmail">Primary Email *</Label>
                                                <Input id="primaryEmail" type="email" placeholder="primary@example.com" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="secondaryEmail">Secondary Email</Label>
                                                <Input id="secondaryEmail" type="email" placeholder="secondary@example.com" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone Numbers */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium flex items-center">
                                            <Phone className="h-5 w-5 mr-2" />
                                            Phone Numbers
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="primaryPhone">Primary Phone *</Label>
                                                <Input id="primaryPhone" placeholder="+1 (555) 123-4567" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="mobilePhone">Mobile Phone</Label>
                                                <Input id="mobilePhone" placeholder="+1 (555) 123-4568" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="workPhone">Work Phone</Label>
                                                <Input id="workPhone" placeholder="+1 (555) 123-4569" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="homePhone">Home Phone</Label>
                                                <Input id="homePhone" placeholder="+1 (555) 123-4570" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium flex items-center">
                                            <MapPin className="h-5 w-5 mr-2" />
                                            Address Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="address1">Address Line 1 *</Label>
                                                <Input id="address1" placeholder="123 Main Street" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address2">Address Line 2</Label>
                                                <Input id="address2" placeholder="Apartment, suite, etc." />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City *</Label>
                                                <Input id="city" placeholder="City name" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State *</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select state" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="CA">California</SelectItem>
                                                        <SelectItem value="TX">Texas</SelectItem>
                                                        <SelectItem value="NY">New York</SelectItem>
                                                        <SelectItem value="FL">Florida</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="zipCode">ZIP Code *</Label>
                                                <Input id="zipCode" placeholder="12345" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country *</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="US">United States</SelectItem>
                                                        <SelectItem value="CA">Canada</SelectItem>
                                                        <SelectItem value="MX">Mexico</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Emergency Contact */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Emergency Contact</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                                                <Input id="emergencyName" placeholder="Full name" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                                                <Input id="emergencyPhone" placeholder="+1 (555) 123-4567" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="emergencyRelation">Relationship</Label>
                                                <Input id="emergencyRelation" placeholder="e.g., Spouse, Parent, Friend" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Professional Information Tab */}
                            <TabsContent value="professional" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company *</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select company" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="abc-corp">ABC Corp</SelectItem>
                                                <SelectItem value="xyz-llc">XYZ LLC</SelectItem>
                                                <SelectItem value="tech-solutions">Tech Solutions Inc</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="jobTitle">Job Title</Label>
                                        <Input id="jobTitle" placeholder="e.g., Software Engineer" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="engineering">Engineering</SelectItem>
                                                <SelectItem value="sales">Sales</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                <SelectItem value="hr">Human Resources</SelectItem>
                                                <SelectItem value="finance">Finance</SelectItem>
                                                <SelectItem value="operations">Operations</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="employeeId">Employee ID</Label>
                                        <Input id="employeeId" placeholder="EMP001" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="startDate">Start Date</Label>
                                        <Input id="startDate" type="date" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="manager">Direct Manager</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select manager" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="john-doe">John Doe</SelectItem>
                                                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                                                <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="workLocation">Work Location</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="headquarters">Headquarters</SelectItem>
                                                <SelectItem value="branch-office">Branch Office</SelectItem>
                                                <SelectItem value="remote">Remote</SelectItem>
                                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="salary">Salary Range</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="30-50k">$30,000 - $50,000</SelectItem>
                                                <SelectItem value="50-75k">$50,000 - $75,000</SelectItem>
                                                <SelectItem value="75-100k">$75,000 - $100,000</SelectItem>
                                                <SelectItem value="100k+">$100,000+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Access Permissions</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="adminAccess" />
                                            <Label htmlFor="adminAccess">Admin Access</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="financeAccess" />
                                            <Label htmlFor="financeAccess">Finance Access</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="reportsAccess" />
                                            <Label htmlFor="reportsAccess">Reports Access</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="inventoryAccess" />
                                            <Label htmlFor="inventoryAccess">Inventory Access</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="supportAccess" />
                                            <Label htmlFor="supportAccess">Support Access</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="settingsAccess" />
                                            <Label htmlFor="settingsAccess">Settings Access</Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="workNotes">Work Notes</Label>
                                    <Textarea
                                        id="workNotes"
                                        placeholder="Professional notes, responsibilities, achievements..."
                                        rows={4}
                                    />
                                </div>
                            </TabsContent>

                            {/* Preferences Tab */}
                            <TabsContent value="preferences" className="space-y-6 mt-6">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Communication Preferences</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="emailNotifications" />
                                                <Label htmlFor="emailNotifications">Email Notifications</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="smsNotifications" />
                                                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="phoneNotifications" />
                                                <Label htmlFor="phoneNotifications">Phone Notifications</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="marketingEmails" />
                                                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Contact Preferences</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select method" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="email">Email</SelectItem>
                                                        <SelectItem value="phone">Phone</SelectItem>
                                                        <SelectItem value="sms">SMS</SelectItem>
                                                        <SelectItem value="mail">Mail</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="bestTimeToCall">Best Time to Call</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select time" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="morning">Morning (9AM-12PM)</SelectItem>
                                                        <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                                                        <SelectItem value="evening">Evening (5PM-8PM)</SelectItem>
                                                        <SelectItem value="anytime">Anytime</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">System Preferences</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="activeContact" defaultChecked />
                                                <Label htmlFor="activeContact">Active Contact</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="primaryContact" />
                                                <Label htmlFor="primaryContact">Primary Contact for Company</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="billingContact" />
                                                <Label htmlFor="billingContact">Billing Contact</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="technicalContact" />
                                                <Label htmlFor="technicalContact">Technical Contact</Label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <Badge variant="secondary">VIP</Badge>
                                            <Badge variant="secondary">Decision Maker</Badge>
                                            <Badge variant="secondary">Technical</Badge>
                                        </div>
                                        <Input id="tags" placeholder="Add tags separated by commas" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="generalNotes">General Notes</Label>
                                        <Textarea
                                            id="generalNotes"
                                            placeholder="Any additional notes about this contact..."
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AddContact