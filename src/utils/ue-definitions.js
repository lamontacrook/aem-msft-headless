export const filterDefinition = () => {
  return [
    {
      'id': 'screen',
      'components': ['teaser', 'image-list']
    },
    {
      'id': 'image-list',
      'components': [ 'article']
    },
    {
      'id':'slides',
      'components':['card']
    }
  ];
};

export const modelDefinition = () => {
  return [
    {
      'id': 'teaser',
      'fields': [
        {
          'component': 'text-input',
          'name': 'title',
          'label': 'Title',
          'valueType': 'string'
        },
        {
          'component': 'text-area',
          'name': 'description',
          'label': 'Description',
          'valueType': 'string'
        },
        {
          'component': 'text-input',
          'name': 'callToAction',
          'label': 'Call to Action',
          'valueType': 'string'
        },
        {
          'component': 'asset',
          'name': 'asset',
          'label': 'Asset',
          'valueType': 'asset'
        }
      ]
    },
    {
      'id': 'card',
      'fields': [
        {
          'component': 'text-input',
          'name': 'headline',
          'label': 'Headline',
          'valueType': 'string'
        },
        {
          'component': 'text-area',
          'name': 'description',
          'label': 'Description',
          'valueType': 'string'
        },
        {
          'component': 'reference',
          'name': 'callToAction',
          'label': 'Call to Action',
          'valueType': 'string'
        },
        {
          'component': 'asset',
          'name': 'asset',
          'label': 'Asset',
          'valueType': 'asset'
        }
      ]
    },
    {
      'id': 'slides',
      'fields': [
        {
          'component': 'reference',
          'name': 'card',
          'label': 'Card',
          'valueType': 'string'
        }
      ]
    },
    {
      'id': 'image-list',
      'fields': [
        {
          'component': 'text-input',
          'name': 'style',
          'label': 'Style',
          'valueType': 'string'
        }
      ]
    },
    {
      'id': 'article',
      'fields': [
        {
          'component': 'text-input',
          'name': 'title',
          'label': 'Title',
          'valueType': 'string'
        }
      ]
    }
  ];
};

export const componentDefinition = (context) => {
  return {
    'groups': [
      {
        'title': 'teaser',
        'id': 'teaser',
        'components': [
          {
            'title': 'Teaser',
            'id': 'teaser',
            'plugins': {
              'aem': {
                'cf': {
                  'name': 'teaser',
                  'cfModel': '/conf/aem-demo-assets/settings/dam/cfm/models/teaser-v2',
                  'cfFolder': `/content/dam/${context.project}/site/en/shared/`,
                  'title': 'Teaser',
                  'description': 'Teaser Content Fragment',
                  'template': {
                    'title': 'Teaser',
                    'style': 'hero',
                    'asset': `/content/dam/${context.project}/assets/AdobeStock_238607111.jpeg`
                  }
                }
              }
            }
          },
          {
            'title': 'Image List',
            'id': 'image-list',
            'plugins': {
              'aem': {
                'cf': {
                  'name': 'image-list',
                  'cfModel': '/conf/aem-demo-assets/settings/dam/cfm/models/image-list-v2',
                  'cfFolder': `/content/dam/${context.project}/site/en/shared/`,
                  'title': 'Image List',
                  'description': 'Image List Content Fragment',
                  'template': {
                    'style': 'slider-list',
                    'headline': 'Image List'
                  }
                }
              }
            }
          },
          {
            'title': 'Magazine Article',
            'id': 'article',
            'plugins': {
              'aem': {
                'cf': {
                  'name': 'article',
                  'cfModel': '/conf/aem-demo-assets/settings/dam/cfm/models/magazine-article',
                  'cfFolder': `/content/dam/${context.project}/site/en/shared/`,
                  'title': 'Article',
                  'description': 'Magazine Article Content Fragment',
                  'template': {
                    'headline': 'Magazine Article'
                  }
                }
              }
            }
          },
          {
            'title': 'Card',
            'id': 'card',
            'plugins': {
              'aem': {
                'cf': {
                  'name': 'article',
                  'cfModel': '/conf/aem-demo-assets/settings/dam/cfm/models/card',
                  'cfFolder': `/content/dam/${context.project}/site/en/default/`,
                  'title': 'Card',
                  'description': 'Card for Slides',
                  'template': {
                    'headline': 'card'
                  }
                }
              }
            }
          }
        ]
      }
    ]
  };
};

/**
 * 
 * @param {*} content 
 * @param {*} title 
 * @param {*} prop 
 * @param {*} type 
 * @param {*} behavior 
 * @param {*} filter 
 * @returns 
 */
export const editorProps = (content, title, prop, type, behavior, filter='screen') => {
  const props = {
    'data-aue-type': type,
    'data-aue-behavior': behavior,
    'data-aue-filter': filter,
    'data-aue-label': title,
  };
  if(content._model && content._model._path) props['data-aue-model'] = content._model._path;
  if(content._path) props['data-aue-resource'] = `urn:aemconnection:${content?._path}/jcr:content/data/${content?._variation}`;
  if(behavior) props['data-aue-behavior'] = behavior;
  if(prop) props['data-aue-prop'] = prop;
  return props;
};