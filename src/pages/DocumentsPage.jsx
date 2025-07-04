import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import FilterArea from "../components/filters/FilterArea";
import DocumentsArea from "../components/cards/DocumentsArea";

const dataDocs = {
  metadata: {
    initial_labels: [
      {
        key: "domain",
        value: "app-dev.example.com",
      },
      {
        key: "env",
        value: "production",
      },
      {
        key: "status",
        value: "success",
      },
    ],
    total_documents: 19,
    document_types: ["app", "console", "build"],
    timestamp: "2025-07-04T12:23:45.000000Z",
  },
  documents_by_type: {
    app: [
      {
        hash: "8f0c5025bfc99ae58cf883ce32e92894",
        type: "app",
        created_by: "data-fake",
        labels: [
          {
            key: "ipv4",
            value: "10.0.250.1",
          },
          {
            key: "domain",
            value: "app-dev.example.com",
          },
          {
            key: "database",
            value: "database-dev.example.com",
          },
          {
            key: "queue",
            value: "queue-dev.example.com",
          },
          {
            key: "s3",
            value: "s3-dev.example.com",
          },
          {
            key: "web",
            value: "web-dev.example.com",
          },
        ],
        document: {
          name: "app-dev",
          domain: "app-dev.example.com",
          requires: [
            "database-dev.example.com",
            "queue-dev.example.com",
            "s3-dev.example.com",
            "web-dev.example.com",
          ],
        },
      },
    ],
    console: [
      {
        hash: "c01a1b2c3d4e5f6g7h8i9j0k1l2m3n4o",
        type: "console",
        created_by: "system-logger",
        labels: [
          { key: "source", value: "auth-service" },
          { key: "level", value: "INFO" },
          { key: "env", value: "production" },
          { key: "user_id", value: "usr-12345" },
        ],
        document: {
          timestamp: "2025-07-04T12:00:00Z",
          message: "User login successful: 'user@example.com'",
          details: {
            ip: "203.0.113.1",
            session_id: "sess-abc-123",
          },
        },
      },
      {
        hash: "c02b1c2d3e4f5g6h7i8j9k0l1m2n3o4p",
        type: "console",
        created_by: "system-logger",
        labels: [
          { key: "source", value: "payment-gateway" },
          { key: "level", value: "ERROR" },
          { key: "env", value: "production" },
          { key: "transaction_id", value: "txn-98765" },
        ],
        document: {
          timestamp: "2025-07-04T12:05:30Z",
          message:
            "Payment failed: Insufficient funds for transaction 'txn-98765'",
          error_code: "400",
          user_id: "usr-98765",
        },
      },
      {
        hash: "c03c1d2e3f4g5h6i7j8k9l0m1n2o3p4q",
        type: "console",
        created_by: "system-logger",
        labels: [
          { key: "source", value: "data-pipeline" },
          { key: "level", value: "WARNING" },
          { key: "env", value: "staging" },
          { key: "pipeline_id", value: "pipe-001" },
        ],
        document: {
          timestamp: "2025-07-04T12:10:00Z",
          message:
            "Data integrity check failed for 'daily_report_20250703'. Discrepancy of 0.5%.",
          threshold: "0.1%",
          actual_discrepancy: "0.5%",
        },
      },
      {
        hash: "c04d1e2f3g4h5i6j7k8l9m0n1o2p3q4r",
        type: "console",
        created_by: "system-logger",
        labels: [
          { key: "source", value: "microservice-api" },
          { key: "level", value: "DEBUG" },
          { key: "env", value: "development" },
          { key: "endpoint", value: "/users/profile" },
        ],
        document: {
          timestamp: "2025-07-04T12:15:45Z",
          message: "API call received: GET /users/profile for user 'devuser'",
          request_params: {
            user: "devuser",
            version: "v1",
          },
        },
      },
      {
        hash: "c05e1f2g3h4i5j6k7l8m9n0o1p2q3r4s",
        type: "console",
        created_by: "system-logger",
        labels: [
          { key: "source", value: "cron-job" },
          { key: "level", value: "CRITICAL" },
          { key: "env", value: "production" },
          { key: "job_name", value: "daily_backup" },
        ],
        document: {
          timestamp: "2025-07-04T12:20:10Z",
          message:
            "CRITICAL: Daily database backup failed. Manual intervention required.",
          error_details: {
            reason: "Disk full",
            server: "db-prod-01",
          },
        },
      },
      {
        hash: "c06f1g2h3i4j5k6l7m8n9o0p1q2r3s4t",
        type: "console",
        created_by: "system-logger",
        labels: [
          { key: "source", value: "cdn-monitor" },
          { key: "level", value: "INFO" },
          { key: "env", value: "production" },
          { key: "cdn_provider", value: "Cloudflare" },
        ],
        document: {
          timestamp: "2025-07-04T12:25:00Z",
          message:
            "CDN cache purge completed successfully for 'assets/images/header.png'",
          asset_path: "/assets/images/header.png",
          purge_status: "success",
        },
      },
    ],
    build: [
      {
        hash: "b01a1b2c3d4e5f6g7h8i9j0k1l2m3n4o",
        type: "build",
        created_by: "ci-pipeline",
        labels: [
          { key: "project", value: "frontend-web" },
          { key: "branch", value: "main" },
          { key: "status", value: "success" },
          { key: "env", value: "production" },
        ],
        document: {
          build_id: "fe-web-1001",
          timestamp: "2025-07-04T11:00:00Z",
          duration_seconds: 120,
          commit_hash: "abcdef123456",
          artifacts: {
            bundle_size_mb: 2.5,
            deploy_url: "https://prod.example.com/app",
          },
        },
      },
      {
        hash: "b02b1c2d3e4f5g6h7i8j9k0l1m2n3o4p",
        type: "build",
        created_by: "ci-pipeline",
        labels: [
          { key: "project", value: "backend-api" },
          { key: "branch", value: "feature/auth" },
          { key: "status", value: "failed" },
          { key: "env", value: "development" },
        ],
        document: {
          build_id: "be-api-2005",
          timestamp: "2025-07-04T11:15:00Z",
          duration_seconds: 180,
          commit_hash: "fedcba987654",
          error_message: "Unit tests failed for 'auth_service.py'",
          failed_stage: "Testing",
        },
      },
      {
        hash: "b03c1d2e3f4g5h6i7j8k9l0m1n2o3p4q",
        type: "build",
        created_by: "ci-pipeline",
        labels: [
          { key: "project", value: "mobile-app" },
          { key: "platform", value: "android" },
          { key: "status", value: "success" },
          { key: "env", value: "staging" },
        ],
        document: {
          build_id: "mob-and-3010",
          timestamp: "2025-07-04T11:30:00Z",
          duration_seconds: 300,
          commit_hash: "123456abcdef",
          apk_size_mb: 50,
          release_candidate: "v1.5.0-rc1",
        },
      },
      {
        hash: "b04d1e2f3g4h5i6j7k8l9m0n1o2p3q4r",
        type: "build",
        created_by: "ci-pipeline",
        labels: [
          { key: "project", value: "data-pipeline" },
          { key: "branch", value: "main" },
          { key: "status", value: "success" },
          { key: "env", value: "production" },
        ],
        document: {
          build_id: "dp-etl-4001",
          timestamp: "2025-07-04T11:45:00Z",
          duration_seconds: 600,
          commit_hash: "987654fedcba",
          data_processed_gb: 100,
          report_generated: true,
        },
      },
      {
        hash: "b05e1f2g3h4i5j6k7l8m9n0o1p2q3r4s",
        type: "build",
        created_by: "ci-pipeline",
        labels: [
          { key: "project", value: "infra-terraform" },
          { key: "branch", value: "dev" },
          { key: "status", value: "failed" },
          { key: "env", value: "development" },
        ],
        document: {
          build_id: "infra-tf-5003",
          timestamp: "2025-07-04T12:00:00Z",
          duration_seconds: 90,
          commit_hash: "abcdefabcdef",
          error_message: "Terraform apply failed: resource already exists",
          terraform_version: "1.0.0",
        },
      },
      {
        hash: "b06f1g2h3i4j5k6l7m8n9o0p1q2r3s4t",
        type: "build",
        created_by: "ci-pipeline",
        labels: [
          { key: "project", value: "docs-site" },
          { key: "branch", value: "main" },
          { key: "status", value: "success" },
          { key: "env", value: "production" },
        ],
        document: {
          build_id: "docs-site-6001",
          timestamp: "2025-07-04T12:15:00Z",
          duration_seconds: 60,
          commit_hash: "fedcbaabcdef",
          pages_generated: 150,
          deploy_destination: "S3 Bucket",
        },
      },
    ],
  },
};

export default function DocumentsPage({ setTheme }) {
  return (
    <PageContainer>
      <Header setTheme={setTheme} />
      <FilterArea info={dataDocs.metadata} />
      <DocumentsArea info={dataDocs.documents_by_type} />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
  padding-top: 60px;
  padding-left: 60px;
  padding-right: 60px;
`;
