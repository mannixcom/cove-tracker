export function generateActivityRatings(data) {
  let seriesData = {
    'Swimming': [],
    'Caving': [],
  };

  data.forEach(({ tide, date }) => {
    let swimmingRating, cavingExploringRating;

    // Logic for rating swimming
    if ((tide >= 0.3)) {
        swimmingRating = 3;
    } else if (tide <= -0.5 ) {
        swimmingRating = 1;
    } else {
        swimmingRating = 2;
    }

    // Logic for rating caving exploring
    if ((tide <= -1.2)) {
        cavingExploringRating = 3;
    } else if (tide >= -0.5 ) {
        cavingExploringRating = 1;
    } else {
        cavingExploringRating = 2;
    }

    seriesData['Swimming'].push({
      x: date,
      y: swimmingRating,
    });

    seriesData['Caving'].push({
      x: date,
      y: cavingExploringRating,
    });

  });

  return Object.entries(seriesData).map(([activity, data]) => ({
    name: activity,
    data: data
  }));
}