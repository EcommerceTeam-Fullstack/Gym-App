import { query } from "../_generated/server";

export const listNeedsMaintenance = query({
  args: {},
  handler: async (ctx) => {
    const equipments = await ctx.db.query("equipments").collect();

    const today = new Date();

    // فلترة الأجهزة اللي محتاجة صيانة
    const needsMaintenance = equipments.filter((eq) => {
      const statusMatch = eq.status === "needs_maintenance";

      const dateMatch =
        eq.nextMaintenanceDate &&
        new Date(eq.nextMaintenanceDate).getTime() <=
          today.getTime() + 7 * 24 * 60 * 60 * 1000;
      return statusMatch || dateMatch;
    });

    return needsMaintenance.sort((a, b) => {
      const da = new Date(a.nextMaintenanceDate || a.lastMaintenanceDate || 0).getTime();
      const db = new Date(b.nextMaintenanceDate || b.lastMaintenanceDate || 0).getTime();
      return da - db;
    });
  },
});
