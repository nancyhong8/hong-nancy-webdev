

var q = require('q');
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js')();
var pageModel = mongoose.model('webdevSPR17Pages', pageSchema);
var websiteModel = require('./website.model.server.js');
var deferred = q.defer();

function createPage(websiteId, page) {
    websiteModel.findWebsiteById(websiteId)
        .then(function(website) {
            website.pages.push(page);
            pageModel.create(page, function(err, page) {
                deferred.resolve(page);
            });
            website.save(function(err, website) {
            });
        });

    return deferred.promise;
}

function findAllPagesForWebsite(websiteId) {
    pageModel.findOne({'_website': websiteId}, function(err, page) {
        deferred.resolve(page);
        console.log('page from model findWebsiteByUser: ' + page);
    });
    return deferred.promise;
}

function findPageById(pageId) {
    pageModel.findOne({'_id': pageId}, function(err, page) {
        deferred.resolve(page);
        console.log('page from model findWebsiteByUser: ' + page);
    });
    return deferred.promise;
}

function updatePage(pageId, page) {
    pageModel.update({'_id': pageId}, {
        $set: {'_website': page._user},
        $set: {'name': page.name},
        $set: {'title': page.title},
        $set: {'description': page.description},
        $set: {'dateCreated': page.dateCreated}
    }, function(err, page) {
        deferred.resolve(page);
    });
    return deferred.promise;
}

function deletePage(pageId) {
    websiteModel.findOne({'_id': pageId}).remove(function(err) {
        if(err) {
            console.log(err);
        }
    });
    return deferred.promise;
}

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

