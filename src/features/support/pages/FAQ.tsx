import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileQuestion,
  ChevronDown,
  ChevronUp,
  Search,
  Home,
  BarChart3,
  FileText,
  Users,
  Settings,
  HelpCircle,
  Upload,
  Download
} from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandAll, setExpandAll] = useState(false);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleExpandAll = () => {
    if (expandAll) {
      setExpandedSections(new Set());
    } else {
      const allSectionIds = faqData.map(section => section.id);
      setExpandedSections(new Set(allSectionIds));
    }
    setExpandAll(!expandAll);
  };

  const faqData = [
    {
      id: "reporting",
      title: "Reporting",
      icon: FileText,
      questions: [
        {
          id: "open-inventory-report",
          question: "How do I run an Open Inventory report on CLS?",
          answer: {
            description: "Below are the procedures to generate an AACANet Open Inventory Report:",
            steps: [
              "From the CLS main menu, enter 4, 2",
              "Enter password, if required",
              "1 (EDI Menu)",
              "4 (Special EDI Functions)",
              "Z (Recovery Management Systems - RMS)",
              "2 (AACA-RMS)",
              "6 (Create Inventory File)",
              "Enter forwarder # / Sort Code: Leave Blank",
              "EDI Type: AACA",
              "Starting Date: Change to desired date",
              "Ending Date: Change to desired date",
              "Open / Closed / All: O"
            ],
            footer: "Please upload the inventory file electronically via My Uploads."
          }
        },
        {
          id: "daily-inventory-report",
          question: "Why do I need to send an Open Inventory Report to AACANet Daily?",
          answer: {
            description: "In an ongoing effort to assure accuracy of accounts placed with AACANet law firms, AACANet needs to receive a daily balance of each account open with the firm. This report is also used to conduct a monthly open/closed account reconciliation. Firms are required to review the inventory report and send AACANet any corrections to assure that the records are accurately reflected at AACANet.",
            steps: [],
            footer: ""
          }
        }
      ]
    },
    {
      id: "dashboard",
      title: "Dashboard",
      icon: BarChart3,
      questions: [
        {
          id: "liquidation-rates",
          question: "How are liquidation rates calculated?",
          answer: {
            description: "Liquidation rates are calculated using the following methodology:",
            steps: [
              "Settled amounts are divided by placed amounts",
              "Calculation is performed across the selected time period",
              "Results are displayed as percentages",
              "Data is updated in real-time"
            ],
            footer: "For more detailed analytics, use the Advanced Reports section."
          }
        },
        {
          id: "export-charts",
          question: "Can I export charts and data?",
          answer: {
            description: "Yes, you can export charts and data in multiple formats:",
            steps: [
              "Click the download button on any chart card",
              "Select your preferred format (PNG, PDF, Excel)",
              "Choose data range if applicable",
              "Click Export to download"
            ],
            footer: "Bulk export options are available in the Reports section."
          }
        },
        {
          id: "filters-work",
          question: "How do filters work across dashboards?",
          answer: {
            description: "Filters at the top navbar apply globally across all dashboards:",
            steps: [
              "Select date range using the date picker",
              "Choose specific companies or accounts",
              "Apply status filters (Active, Inactive, etc.)",
              "Filters persist across page navigation",
              "Use 'Reset Filters' to clear all selections"
            ],
            footer: "Custom filter presets can be saved in Settings."
          }
        }
      ]
    },
    {
      id: "administration",
      title: "Administration",
      icon: Settings,
      questions: [
        {
          id: "add-company",
          question: "How do I add a new company?",
          answer: {
            description: "To add a new company to the system:",
            steps: [
              "Navigate to Administration > Manage Company > Add Company",
              "Fill in the Basic Information tab (Company Name, Code, Business Type)",
              "Complete Contact Information (Address, Phone, Email)",
              "Enter Legal Information (Tax ID, Registration Number)",
              "Set Financial parameters (Credit Limit, Payment Terms)",
              "Configure Settings and Permissions",
              "Click 'Save Company' to complete"
            ],
            footer: "Required fields are marked with an asterisk (*). All data is validated before saving."
          }
        },
        {
          id: "manage-users",
          question: "How do I manage user accounts and permissions?",
          answer: {
            description: "User management is handled through the Administration panel:",
            steps: [
              "Go to Administration > Manage Contact > Manage User",
              "Click 'Add User' to create new accounts",
              "Assign roles (Administrator, Manager, Supervisor, User)",
              "Set department and access permissions",
              "Configure notification preferences",
              "Save and activate the user account"
            ],
            footer: "User permissions can be modified at any time. Password reset options are available."
          }
        }
      ]
    },
    {
      id: "inventory",
      title: "Inventory Management",
      icon: Users,
      questions: [
        {
          id: "inventory-tracking",
          question: "How does inventory tracking work?",
          answer: {
            description: "The inventory system provides real-time tracking capabilities:",
            steps: [
              "Items are automatically tracked upon entry",
              "Status updates are logged with timestamps",
              "Batch processing is available for bulk operations",
              "Reports can be generated for any date range",
              "Integration with CLS ensures data accuracy"
            ],
            footer: "Historical data is maintained for audit purposes."
          }
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: HelpCircle,
      questions: [
        {
          id: "system-requirements",
          question: "What are the system requirements?",
          answer: {
            description: "Minimum system requirements for optimal performance:",
            steps: [
              "Windows 10 or later / macOS 10.15 or later",
              "4GB RAM minimum, 8GB recommended",
              "Modern web browser (Chrome, Firefox, Safari, Edge)",
              "Stable internet connection",
              "JavaScript enabled",
              "Cookies and local storage enabled"
            ],
            footer: "For best performance, use the latest browser versions."
          }
        },
        {
          id: "file-uploads",
          question: "How do I upload files to the system?",
          answer: {
            description: "File uploads are supported in multiple areas:",
            steps: [
              "Navigate to the appropriate upload area",
              "Click 'Choose File' or drag and drop files",
              "Supported formats: PDF, DOC, XLS, TXT, CSV",
              "Maximum file size: 50MB per file",
              "Files are automatically scanned for security",
              "Upload progress is displayed in real-time"
            ],
            footer: "Bulk upload options are available for batch processing."
          }
        }
      ]
    }
  ];

  const filteredData = faqData.map(section => ({
    ...section,
    questions: section.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  return (
    <div className="min-h-screen bg-content-background">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex justify-end">
          <Button variant="outline" size="sm" onClick={handleExpandAll}>
            {expandAll ? "Collapse All" : "Expand All"}
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Sections */}
        <div className="space-y-4">
          {filteredData.map((section) => {
            const IconComponent = section.icon;
            const isExpanded = expandedSections.has(section.id);

            return (
              <Card key={section.id} className="overflow-hidden">
                <div
                  className="p-4 cursor-pointer border-l-4 border-l-blue-500 hover:bg-muted/50 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                      <h2 className="text-lg font-semibold">{section.title}</h2>
                      <Badge variant="secondary">{section.questions.length}</Badge>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <CardContent className="border-t bg-muted/20 p-0">
                    {section.questions.map((faq) => (
                      <div key={faq.id} className="border-b last:border-b-0">
                        <div className="p-4 pl-8">
                          <h3 className="font-medium text-blue-700 mb-3">
                            {faq.question}
                          </h3>

                          <div className="text-sm text-muted-foreground space-y-3">
                            <p>{faq.answer.description}</p>

                            {faq.answer.steps.length > 0 && (
                              <div className="space-y-2">
                                {faq.answer.steps.map((step, index) => (
                                  <div key={index} className="flex items-start space-x-2">
                                    <span className="text-xs">•</span>
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {faq.answer.footer && (
                              <p className="text-blue-600 font-medium">
                                {faq.answer.footer}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {filteredData.length === 0 && searchTerm && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all categories above.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FAQ;
