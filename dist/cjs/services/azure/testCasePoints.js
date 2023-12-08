"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoints = void 0;
function getPoints(axiosClient, config) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!axiosClient || !Object.keys(axiosClient).length) {
            return new Promise(() => {
                throw new Error('Missing valid Azure Devops client');
            });
        }
        let continuationToken = '';
        let fullTestCasePointIds = [];
        do {
            const testCasesPoints = yield axiosClient
                .get(`/testplan/Plans/${config.planId}/Suites/${config.suiteId}/TestCase?witFields=System.Id&continuationToken=${continuationToken}&excludeFlags=0&isRecursive=true`)
                .catch((error) => {
                throw new Error(error);
            });
            const testCasePointIds = testCasesPoints.data.value
                .filter((val) => {
                if (val.pointAssignments) {
                    return true;
                }
                return false;
            })
                .map((val) => { var _a; return (_a = val.pointAssignments[0]) === null || _a === void 0 ? void 0 : _a.id; });
            fullTestCasePointIds = [...fullTestCasePointIds, ...testCasePointIds];
            continuationToken = testCasesPoints.headers['x-ms-continuationtoken'];
        } while (continuationToken !== undefined);
        return fullTestCasePointIds;
    });
}
exports.getPoints = getPoints;
