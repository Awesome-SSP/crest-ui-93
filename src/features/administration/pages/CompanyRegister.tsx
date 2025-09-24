import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CalendarDays } from "lucide-react"

const CompanyRegister = () => {
    const [formData, setFormData] = useState({
        type: "",
        companyCode: "",
        companyName: "",
        typeOfEntity: "",
        status: "Pending",
        stateOfFormation: "",
        dateOfFormation: "",
        taxId: "",
        licenseStates: [],
        placementState: "",
        startTime: "",
        endTime: "",
        timeZone: "",
        websiteAddress: "",
        contactInstructions: ""
    })

    return (
        <div className="min-h-screen bg-content-background">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">COMPANY REGISTRATION</h1>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Proceed To</span>
                        <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <div className="w-4 h-4 rounded-full bg-red-500"></div>
                            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                            <span className="text-sm font-medium">Pipeway</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <Card className="w-full">
                    <CardHeader>
                        <Tabs defaultValue="information" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="information">Information</TabsTrigger>
                                <TabsTrigger value="address">Address</TabsTrigger>
                                <TabsTrigger value="administration">Administration</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                            </TabsList>

                            {/* Information Tab */}
                            <TabsContent value="information" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Row 1 */}
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Type:*</Label>
                                        <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="corporation">Corporation</SelectItem>
                                                <SelectItem value="llc">LLC</SelectItem>
                                                <SelectItem value="partnership">Partnership</SelectItem>
                                                <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="companyCode">Company Code:*</Label>
                                        <Select value={formData.companyCode} onValueChange={(value) => setFormData(prev => ({ ...prev, companyCode: value }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="001">001</SelectItem>
                                                <SelectItem value="002">002</SelectItem>
                                                <SelectItem value="003">003</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">Company Name:*</Label>
                                        <Input
                                            id="companyName"
                                            placeholder="Company Name"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="typeOfEntity">Type of Entity:</Label>
                                        <Select value={formData.typeOfEntity} onValueChange={(value) => setFormData(prev => ({ ...prev, typeOfEntity: value }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="domestic">Domestic</SelectItem>
                                                <SelectItem value="foreign">Foreign</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status:</Label>
                                        <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pending" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                <SelectItem value="suspended">Suspended</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stateOfFormation">State of Formation:</Label>
                                        <Select value={formData.stateOfFormation} onValueChange={(value) => setFormData(prev => ({ ...prev, stateOfFormation: value }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="al">Alabama</SelectItem>
                                                <SelectItem value="ak">Alaska</SelectItem>
                                                <SelectItem value="az">Arizona</SelectItem>
                                                <SelectItem value="ar">Arkansas</SelectItem>
                                                <SelectItem value="ca">California</SelectItem>
                                                <SelectItem value="co">Colorado</SelectItem>
                                                <SelectItem value="ct">Connecticut</SelectItem>
                                                <SelectItem value="de">Delaware</SelectItem>
                                                <SelectItem value="fl">Florida</SelectItem>
                                                <SelectItem value="ga">Georgia</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfFormation">Date of Formation:</Label>
                                        <Input
                                            id="dateOfFormation"
                                            type="date"
                                            placeholder="Date of Formation"
                                            value={formData.dateOfFormation}
                                            onChange={(e) => setFormData(prev => ({ ...prev, dateOfFormation: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="taxId">Tax ID:</Label>
                                        <Input
                                            id="taxId"
                                            placeholder="Tax ID"
                                            value={formData.taxId}
                                            onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                                        />
                                    </div>

                                    {/* Row 3 */}
                                    <div className="space-y-2">
                                        <Label htmlFor="licenseStates">License States:*</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="None Selected" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None Selected</SelectItem>
                                                <SelectItem value="multiple">Multiple States</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="placementState">Placement State:*</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="None Selected" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None Selected</SelectItem>
                                                <SelectItem value="ca">California</SelectItem>
                                                <SelectItem value="ny">New York</SelectItem>
                                                <SelectItem value="tx">Texas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Row 4 */}
                                    <div className="space-y-2">
                                        <Label htmlFor="startTime">Start Time:</Label>
                                        <Input
                                            id="startTime"
                                            type="time"
                                            placeholder="--:-- --"
                                            value={formData.startTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="endTime">End Time:</Label>
                                        <Input
                                            id="endTime"
                                            type="time"
                                            placeholder="--:-- --"
                                            value={formData.endTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="timeZone">Time Zone:</Label>
                                        <Select value={formData.timeZone} onValueChange={(value) => setFormData(prev => ({ ...prev, timeZone: value }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="est">Eastern Standard Time</SelectItem>
                                                <SelectItem value="cst">Central Standard Time</SelectItem>
                                                <SelectItem value="mst">Mountain Standard Time</SelectItem>
                                                <SelectItem value="pst">Pacific Standard Time</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="websiteAddress">Website Address:</Label>
                                        <Input
                                            id="websiteAddress"
                                            placeholder="Website Address"
                                            value={formData.websiteAddress}
                                            onChange={(e) => setFormData(prev => ({ ...prev, websiteAddress: e.target.value }))}
                                        />
                                    </div>

                                    {/* Contact Instructions - Full Width */}
                                    <div className="space-y-2 md:col-span-2 lg:col-span-4">
                                        <Label htmlFor="contactInstructions">Contact Instructions:</Label>
                                        <Textarea
                                            id="contactInstructions"
                                            placeholder="Contact Instructions"
                                            rows={3}
                                            value={formData.contactInstructions}
                                            onChange={(e) => setFormData(prev => ({ ...prev, contactInstructions: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end pt-6">
                                    <Button size="lg">
                                        Next »
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Address Tab */}
                            <TabsContent value="address" className="space-y-6 mt-6">
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Address information form will be implemented here.</p>
                                </div>
                            </TabsContent>

                            {/* Administration Tab */}
                            <TabsContent value="administration" className="space-y-6 mt-6">
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Administration form will be implemented here.</p>
                                </div>
                            </TabsContent>

                            {/* Notes Tab */}
                            <TabsContent value="notes" className="space-y-6 mt-6">
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Notes section will be implemented here.</p>
                                </div>
                            </TabsContent>

                        </Tabs>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default CompanyRegister