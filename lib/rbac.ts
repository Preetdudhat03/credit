import { UserRole } from './auth-store';

/**
 * PRODUCTION-GRADE RBAC SYSTEM CONFIGURATION
 * Defines granular permissions based on banking compliance.
 */

export type Permission =
    | 'view_applicant_profile'
    | 'view_pii'
    | 'view_credit_score'
    | 'view_shap_explanation'
    | 'view_fraud_risk'
    | 'view_loan_recommendation'
    | 'action_decision' // Approve/Reject
    | 'add_remarks'
    | 'edit_ml_model'
    | 'access_model_weights'
    | 'export_dataset'
    | 'override_high_fraud'
    | 'view_fraud_analytics'
    | 'adjust_risk_threshold'
    | 'view_fairness_audits'
    | 'manage_users'
    | 'config_notifications'
    | 'view_system_logs'
    | 'view_financial_details';

export interface RoleConfig {
    permissions: Permission[];
    dataMasking: {
        maskPII: boolean;
        maskFinancials: boolean;
    };
}



export const RBAC_CONFIG: Record<UserRole, RoleConfig> = {
    loan_officer: {
        permissions: [
            'view_applicant_profile',
            'view_credit_score',
            'view_shap_explanation',
            'view_fraud_risk',
            'view_loan_recommendation',
            'action_decision',
            'add_remarks'
        ],
        dataMasking: {
            maskPII: true,
            maskFinancials: false
        }
    },
    risk_manager: {
        permissions: [
            'view_applicant_profile',
            'view_credit_score',
            'view_shap_explanation',
            'view_fraud_risk',
            'view_fraud_analytics',
            'adjust_risk_threshold',
            'view_fairness_audits'
        ],
        dataMasking: {
            maskPII: true,
            maskFinancials: false
        }
    },
    admin: {
        permissions: [
            'manage_users',
            'config_notifications',
            'view_system_logs'
        ],
        dataMasking: {
            maskPII: true,
            maskFinancials: true // Admins cannot see financial details per requirement
        }
    },
    client: {
        permissions: [
            'view_applicant_profile',
            'view_credit_score',
            'view_financial_details'
        ],
        dataMasking: {
            maskPII: false, // User can see their own PII
            maskFinancials: false
        }
    }
};

/**
 * SECURITY: Data Masking Utilities
 * Ensures Zero Raw PII exposure to unauthorized roles.
 */
export const maskIdentifier = (val: string, type: 'aadhaar' | 'phone') => {
    if (!val) return '';
    if (type === 'aadhaar') {
        return 'XXXX-XXXX-' + val.slice(-4);
    }
    if (type === 'phone') {
        return '+91-XXXXX-' + val.slice(-5);
    }
    return val;
};

/**
 * COMPLIANCE: Audit Logging
 * Records every significant action for forensic analysis.
 */
export const logAuditAction = async (userId: string, role: string, action: string) => {
    const logEntry = {
        userId,
        role,
        action,
        timestamp: new Date().toISOString(),
        ip: '192.168.1.1', // Mocked, in prod get from headers
        status: 'success'
    };

    // In a real prod environment, this sends to an immutable log store (e.g., Elasticsearch, CloudWatch)
    console.log('[AUDIT LOG]:', JSON.stringify(logEntry));

    // Simulation of secure write
    return true;
};

/**
 * Middleware-style permission checker
 */
export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
    const config = RBAC_CONFIG[userRole];
    if (!config) return false;

    // Specific override rule: Risk Manager can override decisions
    if (permission === 'action_decision' && userRole === 'risk_manager') return true;

    return config.permissions.includes(permission);
};
