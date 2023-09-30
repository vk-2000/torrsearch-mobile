import React from 'react';
import {View, Text, TouchableOpacity, Linking, Share} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import getStyles from './TorrentCard.styles';
import {useTheme} from '@react-navigation/native';

import {
  faMagnet,
  faUpload,
  faDownload,
  faFolderOpen,
  faExternalLink,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import TextHighlight from '../TextHighlight';

const TorrentCard = ({
  query,
  title,
  seeds,
  leeches,
  size,
  uploadDate,
  magnetLink,
  torrentLink,
}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const handleCopy = () => {
    Clipboard.setString(magnetLink);
  };

  return (
    <View style={styles.container}>
      <TextHighlight
        text={title}
        highlightText={query}
        textColor={colors.text1}
        hightlightColor={colors.primary}
        style={[styles.title, styles.text1]}
      />
      {/* <Text style={[styles.title, styles.text1]}>{title}</Text> */}
      <Text style={[styles.smallText, styles.text2]}>{uploadDate}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.textInfoContainer}>
          <View style={styles.sizeContainer}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faFolderOpen}
              size={12}
              color={colors.primary}
            />
            <Text style={[styles.smallText, styles.text2]}>{size}</Text>
          </View>
          <View style={styles.peerInfoContainer}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faUpload}
              size={12}
              color={'green'}
            />
            <Text style={[styles.peer, styles.text1]}>{seeds}</Text>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faDownload}
              size={12}
              color={'red'}
            />
            <Text style={[styles.peer, styles.text1]}>{leeches}</Text>
          </View>
        </View>
        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://youtu.be/dQw4w9WgXcQ?si=P4IcIUL5EYTyQrPz',
              )
            }>
            <View style={[styles.button, styles.torrentLink]}>
              <FontAwesomeIcon icon={faExternalLink} size={16} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Share.share({message: magnetLink})}>
            <View style={[styles.button, styles.torrentLink]}>
              <FontAwesomeIcon icon={faShareAlt} size={16} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCopy}>
            <View style={[styles.button, styles.magnetLink]}>
              <FontAwesomeIcon icon={faMagnet} size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(TorrentCard);
