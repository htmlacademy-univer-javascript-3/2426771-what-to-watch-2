export function getRatingLevel(rating: number) {
  if (rating === 10) {
    return 'Awesome';
  } else if (rating > 8) {
    return 'Very Good';
  } else if (rating > 5) {
    return 'Good';
  }else if (rating > 3) {
    return 'Normal';
  } else {
    return 'Bad';
  }
}
