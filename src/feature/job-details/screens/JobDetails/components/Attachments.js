import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { colors, spacing, typography } from '../../../../../theme';

import plusIcon from '../../../../../../assets/images/plusIcon.png';
import imageAdd from '../../../../../../assets/images/image-add.png';
import servicesIcon from '../../../../../../assets/images/servicesIcon.png';
import Notes from './Notes';

const Attachments = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.jobSourceView}>
        <View style={styles.headerView}>
          <Text style={styles.header}>Attachments</Text>
        </View>
      </View>
      <View style={styles.serviceRow}>
        <Pressable style={{ flexDirection: 'row', width: '80%' }}>
          <Image style={styles.servicesIcon} source={servicesIcon} />
          <Text style={styles.serviceText}>Attach images</Text>
        </Pressable>
        <Pressable onPress={pickImage}>
          <Image style={styles.servicesIcon} source={imageAdd} />
        </Pressable>
      </View>
      <View style={{ paddingHorizontal: '5%' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image
            style={styles.image}
            source={{ uri: 'https://cdn.pixabay.com/photo/2010/12/13/10/05/berries-2277_960_720.jpg' }}
          />
          <Image
            style={styles.image}
            source={{ uri: 'https://cdn.pixabay.com/photo/2010/12/13/10/05/berries-2277_960_720.jpg' }}
          />
          <Image
            style={styles.image}
            source={{ uri: 'https://cdn.pixabay.com/photo/2010/12/13/10/05/berries-2277_960_720.jpg' }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: spacing.SCALE_10,
    backgroundColor: colors.shadow,
  },
  jobSourceView: {
    borderRadius: spacing.SCALE_4,
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
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.SCALE_10,
    paddingHorizontal: '5%',
  },
  listItemCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.SCALE_10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: colors.primary,
  },
  iconsView: { flexDirection: 'row', marginBottom: spacing.SCALE_10, alignItems: 'center' },
  servicesIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: spacing.SCALE_10,
  },
  image: {
    height: spacing.SCALE_78,
    width: spacing.SCALE_106,
    borderRadius: spacing.SCALE_6,
    marginRight: spacing.SCALE_10,
  },
});

export default Attachments;
