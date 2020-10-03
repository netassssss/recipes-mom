const { path } = require('../../consts/firebase');
const { parseReqArguments } = require('../../utils/dbHelper');

const setDocumentInDb = async (firebase, data) => {
  const documentName = data.documentId;

  const categoryRef = firebase.collection(path).doc(documentName);

  await categoryRef.update({ current: data.current });
};

const parseData = ({ ingredients, description, title }) => ({
  documentId: title,
  current: {
    [title]: {
      ingredients,
      description,
    },
  },
});

module.exports = async (args) => {
  const { req, res, firebase } = parseReqArguments(args);
  const { ingredients, description, title } = req.body;
  try {
    await setDocumentInDb(firebase, parseData({ ingredients, description, title }));
  } catch (e) {
    console.log('error on update', e);
  } finally {
    res.send(true);
  }
};
