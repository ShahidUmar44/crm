import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

import Input from '../../../../../shared/form/Input';
import { colors, spacing, typography } from '../../../../../theme';

import editPencil from '../../../../../../assets/images/editPencil.png';
import deleteIcon from '../../../../../../assets/images/deleteIcon.png';
import BigButton from '../../../../../shared/buttons/BigButton';

const Notes = () => {
  const [notesArr, setNotesArr] = useState([]);
  const [title, setTitle] = useState('');
  const [descripton, setDescripton] = useState('');
  const [indexToEdit, setIndexToEdit] = useState(null);
  const handleAdd = () => {
    if (!indexToEdit) {
      let arr = [...notesArr];
      arr.unshift({ id: notesArr.length, title: title, description: descripton });
      setNotesArr(arr);
      setDescripton('');
      setTitle('');
    } else {
      notesArr[indexToEdit] = { id: notesArr.length, title: title, description: descripton };
      setNotesArr(notesArr);
      setDescripton('');
      setTitle('');
    }
  };

  const handleDelete = index => {
    let arr = [...notesArr];
    arr.splice(index, 1);
    setNotesArr(arr);
  };
  const handleEdit = item => {
    setDescripton(item.description);
    setTitle(item.title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.jobSourceView}>
        <View style={styles.headerView}>
          <Text style={styles.header}>Private Notes</Text>
        </View>
        <View style={{ marginHorizontal: '5%' }}>
          <Input
            backgroundColor={colors.whiteBackground}
            onChangeText={setDescripton}
            value={descripton}
            placeholder="Desription..."
          />
          <View style={{ alignItems: 'flex-end', marginTop: spacing.SCALE_10 }}>
            <BigButton width={spacing.SCALE_106} height={spacing.SCALE_40} onPress={handleAdd}>
              <Text style={{ color: colors.text }}>{indexToEdit ? 'Save' : 'Add'}</Text>
            </BigButton>
          </View>
        </View>
        {notesArr?.map((item, index) => {
          return (
            <View style={styles.noteBox} key={index}>
              <View style={styles.noteHeaderView}>
                <Text style={styles.noteHeading}>{item.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    onPress={() => {
                      setIndexToEdit(index);
                      handleEdit(item, index);
                    }}>
                    <Image style={styles.icon} resizeMode="contain" source={editPencil} />
                  </Pressable>
                  <Pressable onPress={() => handleDelete(index)}>
                    <Image style={styles.icon} resizeMode="contain" source={deleteIcon} />
                  </Pressable>
                </View>
              </View>
              <Text>{item.description}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: spacing.SCALE_10,
  },
  jobSourceView: {
    borderRadius: spacing.SCALE_4,
    marginTop: spacing.SCALE_20,
    backgroundColor: colors.shadow,
    width: '100%',
    paddingBottom: spacing.SCALE_4,
  },
  headerView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: spacing.SCALE_10,
  },
  header: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  noteBox: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: '5%',
    borderRadius: 5,
    alignItems: 'center',
    padding: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
  },
  icon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: spacing.SCALE_10,
  },
  noteHeading: {
    fontSize: typography.FONT_SIZE_16,
  },
  noteHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.SCALE_10,
  },
});
export default Notes;
