import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, X, Plus } from "lucide-react"
import { format } from "date-fns"

const AddCompany = () => {
    const [date, setDate] = useState<Date>()
    const [activeTab, setActiveTab] = useState("basic")

    return (
        <div className="min-h-screen bg-content-background">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">ADD COMPANY</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                        <Button size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Save Company
                        </Button>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardContent className="p-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                                <TabsTrigger value="contact">Contact</TabsTrigger>
                                <TabsTrigger value="legal">Legal</TabsTrigger>
                                <TabsTrigger value="financial">Financial</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>

                            {/* Basic Information Tab */}
                            <TabsContent value="basic" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">Company Name *</Label>
                                        <Input id="companyName" placeholder="Enter company name" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="companyCode">Company Code *</Label>
                                        <Input id="companyCode" placeholder="e.g., ABC001" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="businessType">Business Type</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select business type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="corporation">Corporation</SelectItem>
                                                <SelectItem value="llc">LLC</SelectItem>
                                                <SelectItem value="partnership">Partnership</SelectItem>
                                                <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                                                <SelectItem value="non-profit">Non-Profit</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="industry">Industry</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select industry" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="technology">Technology</SelectItem>
                                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                                <SelectItem value="finance">Finance</SelectItem>
                                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                                <SelectItem value="retail">Retail</SelectItem>
                                                <SelectItem value="services">Services</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Founded Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="employeeCount">Employee Count</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select employee range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1-10">1-10</SelectItem>
                                                <SelectItem value="11-50">11-50</SelectItem>
                                                <SelectItem value="51-200">51-200</SelectItem>
                                                <SelectItem value="201-500">201-500</SelectItem>
                                                <SelectItem value="500+">500+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Company Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Brief description of the company..."
                                        rows={4}
                                    />
                                </div>
                            </TabsContent>

                            {/* Contact Information Tab */}
                            <TabsContent value="contact" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Primary Email *</Label>
                                        <Input id="email" type="email" placeholder="company@example.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Primary Phone *</Label>
                                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website</Label>
                                        <Input id="website" placeholder="https://company.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="fax">Fax</Label>
                                        <Input id="fax" placeholder="+1 (555) 123-4568" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Address Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="address1">Address Line 1 *</Label>
                                            <Input id="address1" placeholder="123 Main Street" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address2">Address Line 2</Label>
                                            <Input id="address2" placeholder="Suite 100" />
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
                            </TabsContent>

                            {/* Legal Information Tab */}
                            <TabsContent value="legal" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="taxId">Tax ID (EIN) *</Label>
                                        <Input id="taxId" placeholder="12-3456789" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="registrationNumber">Registration Number</Label>
                                        <Input id="registrationNumber" placeholder="Company registration number" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stateOfIncorporation">State of Incorporation</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DE">Delaware</SelectItem>
                                                <SelectItem value="CA">California</SelectItem>
                                                <SelectItem value="TX">Texas</SelectItem>
                                                <SelectItem value="NY">New York</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="duns">DUNS Number</Label>
                                        <Input id="duns" placeholder="123456789" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Legal Status</h3>
                                    <RadioGroup defaultValue="active">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="active" id="active" />
                                            <Label htmlFor="active">Active</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="inactive" id="inactive" />
                                            <Label htmlFor="inactive">Inactive</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="dissolved" id="dissolved" />
                                            <Label htmlFor="dissolved">Dissolved</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </TabsContent>

                            {/* Financial Information Tab */}
                            <TabsContent value="financial" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="creditLimit">Credit Limit</Label>
                                        <Input id="creditLimit" placeholder="$0.00" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="paymentTerms">Payment Terms</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select payment terms" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="net30">Net 30</SelectItem>
                                                <SelectItem value="net60">Net 60</SelectItem>
                                                <SelectItem value="net90">Net 90</SelectItem>
                                                <SelectItem value="cod">Cash on Delivery</SelectItem>
                                                <SelectItem value="prepaid">Prepaid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Default Currency</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select currency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USD">USD - US Dollar</SelectItem>
                                                <SelectItem value="EUR">EUR - Euro</SelectItem>
                                                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bankAccount">Bank Account</Label>
                                        <Input id="bankAccount" placeholder="Account number" />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Settings Tab */}
                            <TabsContent value="settings" className="space-y-6 mt-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Company Settings</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="isActive" />
                                            <Label htmlFor="isActive">Active Company</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="isCustomer" />
                                            <Label htmlFor="isCustomer">Customer</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="isVendor" />
                                            <Label htmlFor="isVendor">Vendor</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="requiresApproval" />
                                            <Label htmlFor="requiresApproval">Requires Approval for Transactions</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="allowCreditHold" />
                                            <Label htmlFor="allowCreditHold">Allow Credit Hold</Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Notification Settings</h3>

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
                                            <Checkbox id="invoiceReminders" />
                                            <Label htmlFor="invoiceReminders">Invoice Reminders</Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Internal Notes</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Internal notes about this company..."
                                        rows={4}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AddCompany