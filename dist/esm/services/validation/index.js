import { azureConfig } from '../../schema-validation';
export const validate = (config) => {
    const v = azureConfig.validate(config);
    if (v.length > 0) {
        return false;
    }
    return true;
};
