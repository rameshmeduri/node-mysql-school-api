/**
 *
 * @param {str} string
 *
 * @example str="Hello students! @studentagnes@example.com @studentmiche@example.com"
 *
 * @returns {['@studentagnes@example.com', '@studentmiche@example.com']}
 *
 */

exports.getAllMentionStudentsEmail = (str = '') => {
  return str.match(
    /@(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g
  );
};
