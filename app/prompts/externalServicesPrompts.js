'use strict';

var externalServicesPrompts = {

  prompts: [{ // default type is 'input'
    name     : 'organizationname',
    message  : 'Please enter your github username or organization'
  }, {
    name     : 'awsAPIKey',
    message  : 'Please enter your AWS API Key:',
    default  : 'ENTER_AWS_KEY'
  }, {
    name     : 'awsSecret',
    message  : 'Please enter your AWS Secret:',
    default  : 'ENTER_AWS_SECRET'
  }, {
    name     : 's3BucketName',
    message  : 'Enter the name of the S3 bucket you wish to use for uploads:',
    default  : 'enter-s3-bucket-name-here'
  }, {
    name     : 's3Region',
    message  : 'Enter the S3 region to use:',
    default  : 'US Standard'
  }, {
    name     : 'adminLogin',
    message  : 'Enter an email address for the first Admin user:',
    default  : 'user@example.com'
  }, {
    name     : 'adminPassword',
    message  : 'Enter a password for the first Admin user:',
    default  : 'admin'
  }],
  prompt: function(generator) {
    var done = generator.async();
    var prompts = this.prompts;
    generator.prompt(prompts, function(responses) {

      generator.organizationname = responses.organizationname;
      generator.mandrillAPIKey   = responses.mandrillAPIKey;
      generator.awsAPIKey        = responses.awsAPIKey;
      generator.awsSecret        = responses.awsSecret;
      generator.s3BucketName     = responses.s3BucketName;
      generator.s3Region         = responses.s3Region;
      generator.adminLogin       = responses.adminLogin;
      generator.adminPassword    = responses.adminPassword;

      generator.log('mandrillAPIKey ' + generator.mandrillAPIKey);
      generator.log('awsAPIKey ' + generator.awsAPIKey);
      generator.log('awsSecret ' + generator.awsSecret);
      generator.log('s3BucketName ' + generator.s3BucketName);
      generator.log('s3Region ' + generator.s3Region);
      done();
    }.bind(generator));
  }
};

module.exports = externalServicesPrompts;
