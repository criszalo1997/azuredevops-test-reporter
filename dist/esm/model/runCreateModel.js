export class RunCreateModel {
    automated;
    configurationIds;
    name;
    plan;
    pointIds;
    constructor(name, plan, pointIds) {
        this.automated = true;
        this.configurationIds = [];
        this.name = name;
        this.plan = plan;
        this.pointIds = pointIds;
    }
}
