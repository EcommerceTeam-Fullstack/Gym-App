




export  const totalCalories = (meals: any[]) => {
  if (!Array.isArray(meals) || meals.length === 0) return 0

  return meals.reduce((sum, meal) => {
    const cals = Number(meal.calories) || 0 
    return sum + cals}, 0)
}
