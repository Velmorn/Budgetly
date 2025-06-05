import BudgetService from "../API/BudgetService.js";
import {calculateEndDate} from "./calculateEndDate.js";

export const checkAndUpdateBudgetPeriods = async (budgets) => {
    const today = new Date();

    for (const budget of budgets) {
        const currentPeriod = budget.currentPeriod;

        const endDate = new Date(currentPeriod.endDate);

        if (today > endDate) {
            const startDate = endDate;
            const newEndDate = calculateEndDate(startDate, budget.period, budget.periodCount)

            if(currentPeriod.startDate == startDate && currentPeriod.endDate == newEndDate ) {
                continue
            }

            const periodData = {
                startDate: startDate,
                endDate: newEndDate
            };

            try {
                await BudgetService.createPeriod(budget.id, periodData);
            } catch (e) {
            }
        } else {
        }
    }

};