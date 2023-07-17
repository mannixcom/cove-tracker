export function generateActivityRatings(data) {
  let seriesData = {
    'Swimming': [],
    'Caving': [],
    'Fishing': [],
    'Seaweed Picking': [],
    // 'Rockpools': [],
  };

  data.forEach(({ tide, date }) => {
    let swimmingRating, cavingExploringRating, fishingRating, seaweedRating;
    let formatDate = new Date(date);
    let hour = formatDate.getUTCHours();
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

    //Logic for rating fishing
    if((tide > 0.9) && (hour >= 17 && hour <22)){
      fishingRating = 3;
    } else {
      fishingRating = 1;
    }

    //Logic for rating Seaweed Picking
      if((tide < -1.2)){
        seaweedRating = 3;
      } else {
        seaweedRating = 1;
      }

    seriesData['Caving'].push({
      x: date,
      y: cavingExploringRating,
    });

    seriesData['Fishing'].push({
      x: date,
      y: fishingRating,
    });

    seriesData['Swimming'].push({
      x: date,
      y: swimmingRating,
    });

    seriesData['Seaweed Picking'].push({
      x: date,
      y: seaweedRating,
    })

  });

  return Object.entries(seriesData).map(([activity, data]) => ({
    name: activity,
    data: data
  }));
}