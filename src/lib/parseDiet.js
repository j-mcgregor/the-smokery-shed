export default diet => {
  switch (diet.toLowerCase()) {
    case 'vegetarian':
      return 'V';
    case 'vegan':
      return 'VG';
    case 'contains nuts':
      return 'nuts';
    case 'gluten free':
      return 'GF';
    default:
      return '';
  }
};
