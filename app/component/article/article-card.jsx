import React from 'react'
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

export class ArticleCard extends React.Component {
  render () {
    return (
      <Card style={{'margin': '12px'}}>
        <CardMedia
          overlay={<CardTitle title={this.props.title} />}
        >
          <img src={this.props.imgPath} />
        </CardMedia>
        <CardText>
          {this.props.text}
        </CardText>
        <CardActions>
          <a href={this.props.articlePath}>
            <RaisedButton label='詳細を見る' />
          </a>
        </CardActions>
      </Card>
    )
  }
}
ArticleCard.propTypes = {
  title: React.PropTypes.string,
  imgPath: React.PropTypes.string,
  text: React.PropTypes.string,
  articlePath: React.PropTypes.string
}
