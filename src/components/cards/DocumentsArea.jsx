import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { JsonEditor, defaultTheme, githubDarkTheme } from "json-edit-react";
import { useTranslation } from "react-i18next";

export default function DocumentsArea({ documents }) {
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    console.log(theme);
  }, []);

  const [title, setTitle] = useState("All Documents");
  const [numOfColumns, setNumOfColumns] = useState(4);

  return (
    <DocumentsContainer>
      <h3>{title}</h3>
      <CardsBox numOfColumns={numOfColumns}>
        {testList.map((document) => (
          <DocumentCard key={document.id}>
            <JsonEditor
              data={document}
              rootName={document.name}
              viewOnly
              indent={2}
              collapseAnimationTime={150}
              showCollectionCount="when-closed"
              rootFontSize="15px"
              translations={{
                ITEM_SINGLE: `{{count}} ${t("item")}`,
                ITEMS_MULTIPLE: `{{count}} ${t("items")}`,
              }}
              theme={
                theme.mode == "light"
                  ? [
                      defaultTheme,
                      {
                        container: {
                          backgroundColor: "transparent",
                        },
                      },
                    ]
                  : [
                      githubDarkTheme,
                      {
                        container: {
                          backgroundColor: "transparent",
                        },
                      },
                    ]
              }
            />
          </DocumentCard>
        ))}
      </CardsBox>
    </DocumentsContainer>
  );
}

const DocumentsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 0;

  h3{
    color: #005564;
  }
`;

const CardsBox = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const DocumentCard = styled.div`
  //width: 450px;
  //height: 250px;
  border-radius: 5px;
  padding: 0px;
  background-color: ${(props) => props.theme.colors.documents.backgroundColor};
  border: 1px solid ${(props) => props.theme.colors.documents.downButton};
  box-shadow: 0 1px 2px rgb(0 0 0 / 24%);
  cursor: pointer;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  display: flex;
  gap: 10px;

  &:hover {
    box-shadow: 0 4px 8px rgb(0 0 0 / 24%);
  }

  flex-shrink: 0; /* Impede que o item encolha */

  &.scroll {
    width: 370px;
  }
`;

const testList = [
  {
    id: 1,
    name: "project-alpha",
    title: "Alpha Project Overview",
    description:
      "Initial documentation for Project Alpha, focusing on core functionalities and user flows.",
    status: "active",
    version: "1.0.0",
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: 2,
    name: "server-config-prod-01",
    title: "Production Server Configuration - Node.js",
    description:
      "Configuration details for the primary Node.js production server, including environment variables and scaling.",
    environment: "production",
    ip_address: "192.168.1.101",
    os: "Linux Ubuntu 22.04",
    lastUpdated: "2024-06-20T14:30:00Z",
  },
  {
    id: 3,
    name: "database-schema-v3",
    title: "Database Schema Definition - Version 3",
    description:
      "Detailed schema for the main application database, including table structures, relationships, and indexing strategies.",
    db_type: "PostgreSQL",
    version_control: "Git",
    maintainer: "DBA Team",
    tables: ["users", "products", "orders", "payments"],
  },
  {
    id: 4,
    name: "api-gateway-setup",
    title: "API Gateway Setup Guide",
    description:
      "Instructions for setting up and configuring the API Gateway service, focusing on routing and authentication.",
    service_provider: "AWS API Gateway",
    endpoints_count: 15,
    security_protocols: ["OAuth2", "JWT"],
    is_public: true,
  },
  {
    id: 5,
    name: "mobile-app-release-notes-2.1",
    title: "Mobile App Release Notes - Version 2.1",
    description:
      "Key features, bug fixes, and improvements introduced in the latest mobile application release.",
    platform: ["iOS", "Android"],
    release_date: "2024-07-01",
    bug_fixes: 25,
    new_features: ["Dark Mode", "Offline Sync"],
  },
  {
    id: 6,
    name: "iot-device-firmware-update",
    title: "IoT Device Firmware Update Process",
    description:
      "Step-by-step guide for updating firmware on IoT devices, including rollback procedures.",
    device_model: "Sensor-X1",
    firmware_version: "3.5.1",
    connectivity: "Wi-Fi",
    tags: ["IoT", "Firmware", "Maintenance"],
  },
  {
    id: 7,
    name: "frontend-build-pipeline",
    title: "Frontend CI/CD Pipeline Configuration",
    description:
      "YAML configuration for the automated build and deployment pipeline for the frontend application.",
    pipeline_tool: "GitLab CI",
    build_duration_avg_min: 5,
    test_coverage: "90%",
    framework: "React",
  },
  {
    id: 8,
    name: "data-migration-plan-q3",
    title: "Q3 Data Migration Strategy",
    description:
      "Strategic plan for migrating historical data from legacy systems to the new data warehouse.",
    source_system: "LegacyDB",
    target_system: "Snowflake",
    estimated_completion: "2024-09-30",
    data_volume_gb: 500,
  },
  {
    id: 9,
    name: "security-audit-report-2024",
    title: "Annual Security Audit Report 2024",
    description:
      "Results and recommendations from the annual external security audit, identifying vulnerabilities and areas for improvement.",
    audit_firm: "SecureIT Inc.",
    findings_critical: 2,
    findings_high: 7,
    compliance_standards: ["ISO 27001", "GDPR"],
  },
  {
    id: 10,
    name: "cloud-infra-costs-q2",
    title: "Q2 Cloud Infrastructure Cost Analysis",
    description:
      "Analysis of cloud spending for the second quarter, highlighting cost optimizations and budget adherence.",
    cloud_provider: "Google Cloud",
    total_spend_usd: 120500,
    budget_adherence: "under",
    services_used: ["Compute Engine", "Cloud Storage", "BigQuery"],
  },
  {
    id: 11,
    name: "customer-feedback-analysis",
    title: "Customer Feedback Analysis Report - May",
    description:
      "Summary of customer feedback received in May, identifying common themes and sentiment scores.",
    feedback_source: "Support Tickets, Surveys",
    sentiment_score: 4.2,
    top_issues: ["UI Confusion", "Bug Reports"],
  },
  {
    id: 12,
    name: "ml-model-training-log",
    title: "Machine Learning Model Training Log - V2",
    description:
      "Detailed log of training parameters, performance metrics, and data used for the latest ML model version.",
    model_name: "FraudDetectionV2",
    accuracy: 0.98,
    training_time_hours: 12,
    dataset_size_gb: 10,
  },
  {
    id: 13,
    name: "onboarding-guide-new-hires",
    title: "New Hire Onboarding Guide",
    description:
      "Comprehensive guide for new employees, covering company policies, tools, and initial setup procedures.",
    department: "HR",
    duration_days: 5,
    checklist_items: 30,
    has_video_tutorials: true,
  },
  {
    id: 14,
    name: "marketing-campaign-q4",
    title: "Q4 Marketing Campaign Plan",
    description:
      "Strategic plan for the fourth quarter marketing initiatives, including channels, budget, and KPIs.",
    channels: ["Social Media", "Email", "PPC"],
    budget_usd: 75000,
    kpis: ["CTR", "Conversion Rate", "ROI"],
    target_audience: "Millennials",
  },
  {
    id: 15,
    name: "internal-audit-compliance",
    title: "Internal Audit Checklist - Compliance",
    description:
      "Checklist for internal audit teams to ensure adherence to regulatory compliance requirements.",
    regulation: "SOX",
    audit_frequency: "quarterly",
    last_audit_date: "2024-03-01",
    auditor: "Internal Audit Dept.",
  },
  {
    id: 16,
    name: "devops-tooling-guide",
    title: "DevOps Tooling Guide",
    description:
      "Overview and usage guidelines for various DevOps tools adopted across development teams.",
    tools: ["Docker", "Kubernetes", "Jenkins", "Ansible"],
    contributor: "DevOps Team",
    training_required: true,
  },
  {
    id: 17,
    name: "user-manual-v1.2",
    title: "Product User Manual - Version 1.2",
    description:
      "Updated user manual for the main product, reflecting recent UI changes and new features.",
    language: ["English", "Spanish"],
    pages: 120,
    last_review: "2024-05-10",
    audience: "End Users",
  },
  {
    id: 18,
    name: "it-security-policy-2024",
    title: "IT Security Policy - 2024 Update",
    description:
      "Revised company-wide IT security policy, outlining acceptable use, data protection, and incident response procedures.",
    policy_version: "2.0",
    effective_date: "2024-08-01",
    approver: "CISO",
  },
  {
    id: 19,
    name: "sales-report-q1-2024",
    title: "Q1 2024 Sales Performance Report",
    description:
      "Comprehensive analysis of sales figures, revenue, and customer acquisition for the first quarter of 2024.",
    revenue_usd: 5000000,
    new_customers: 1500,
    product_categories: ["Software", "Hardware", "Services"],
    region: "North America",
  },
  {
    id: 20,
    name: "project-budget-fy2025",
    title: "Fiscal Year 2025 Project Budget",
    description:
      "Detailed budget allocation for all ongoing and planned projects for the upcoming fiscal year.",
    fiscal_year: "2025",
    total_budget_usd: 10000000,
    departments: ["R&D", "Marketing", "Sales"],
    approved: true,
  },
  {
    id: 21,
    name: "hr-policies-benefits",
    title: "HR Policies - Employee Benefits",
    description:
      "Documentation outlining all employee benefits, including health insurance, retirement plans, and paid time off.",
    policy_owner: "HR Department",
    last_updated: "2023-11-01",
    contact_person: "Jane Doe",
  },
  {
    id: 22,
    name: "network-diagram-v4",
    title: "Company Network Diagram - Version 4",
    description:
      "Updated visual representation of the company's network infrastructure, including subnets and devices.",
    diagram_tool: "Draw.io",
    network_segments: 5,
    last_reviewed_by: "Network Ops",
  },
  {
    id: 23,
    name: "research-paper-ai-ethics",
    title: "Research Paper - AI Ethics Guidelines",
    description:
      "Internal research paper exploring ethical considerations and best practices for AI development and deployment.",
    researcher: "Dr. Alan Turing",
    publication_date: "2024-04-20",
    keywords: ["AI", "Ethics", "Responsible AI"],
    citations: 12,
  },
  {
    id: 24,
    name: "customer-support-playbook",
    title: "Customer Support Playbook - Tier 1",
    description:
      "Guide for Tier 1 support agents on common issues, troubleshooting steps, and escalation procedures.",
    target_audience: "Support Agents",
    last_update: "2024-02-15",
    channels_covered: ["Email", "Chat"],
  },
  {
    id: 25,
    name: "legal-privacy-policy",
    title: "Website Privacy Policy (GDPR Compliant)",
    description:
      "Official privacy policy document for the company website, ensuring compliance with data protection regulations.",
    document_type: "Legal",
    compliance_framework: "GDPR",
    review_frequency: "annual",
    next_review_date: "2025-01-01",
  },
];
