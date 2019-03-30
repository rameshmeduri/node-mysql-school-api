exports.apiAccess = function(apiUrl, params) {
  let requiredParameters = '';
  switch (apiUrl) {
    case '/api/register':
      if (
        typeof params.teacher !== 'string' ||
        typeof params.students !== 'object'
      )
        requiredParameters = 'teacher, students';
      break;
    case '/api/commonstudents':
      if (typeof params.teacher === 'undefined') requiredParameters = 'teacher';
      break;
    case '/api/suspend':
      if (typeof params.student !== 'string') requiredParameters = 'student';
      break;
    case '/api/retrievefornotifications':
      if (
        typeof params.teacher !== 'string' ||
        typeof params.notification !== 'string'
      )
        requiredParameters = 'teacher, notification';
      break;
  }
  return requiredParameters;
};
