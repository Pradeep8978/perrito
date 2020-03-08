import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export class MowStarView extends React.Component {
  static propTypes = {
    score: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
  };

  render() {
      const {style, score, ...restProps} = this.props;
      const startStyle = {
        color: '#FF9529',
        backgroundColor: 'transparent',
        textShadowColor: '#999',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1,
        fontSize: 16,
        ...style
      }
    return (
      <Stars
        {...this.props}
        update={val => {
          this.props.updateStars(val)
        }}
        fullStar= {<Icon name={'star'} style={[startStyle]} />}
        emptyStar= {<Icon name={'star'} style={[startStyle, styles.myEmptyStarStyle]}/>}
        halfStar= {<Icon name={'star-half'} style={[startStyle]}/>}
        {...restProps}
        default={score}
      />
    );
  }
}

const styles = StyleSheet.create({
    myEmptyStarStyle: {
      color: 'white',
    }
});

MowStarView.defaultProps = {
    half:true,
    default:3,
    updateStars: ()=>{},
    spacing: 2,
    starSize: 200,
    count: 5,
}

