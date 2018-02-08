import {cloneRepository, buildRepository, toGitPathSep} from '../helpers';
function createFilePatch(oldFilePath, newFilePath, status, hunks) {
  const oldFile = new FilePatch.File({path: oldFilePath});
  const newFile = new FilePatch.File({path: newFilePath});
  const patch = new FilePatch.Patch({status, hunks});

  return new FilePatch(oldFile, newFile, patch);
}

      const filePatch = createFilePatch('a.txt', 'a.txt', 'modified', [
      assert.deepEqual(filePatch.getStagePatchForLines(new Set(linesFromHunk2)), createFilePatch(
      assert.deepEqual(filePatch.getStagePatchForLines(new Set(selectedLines)), createFilePatch(
        const filePatch = createFilePatch('a.txt', null, 'deleted', [
        assert.deepEqual(filePatch.getStagePatchForLines(new Set(linesFromHunk)), createFilePatch(
          'a.txt', 'a.txt', 'modified', [
        const filePatch = createFilePatch('a.txt', null, 'deleted', [
        assert.deepEqual(filePatch.getStagePatchForLines(new Set(linesFromHunk)), createFilePatch(
      const filePatch = createFilePatch('a.txt', 'a.txt', 'modified', [
      assert.deepEqual(filePatch.getUnstagePatchForLines(lines), createFilePatch(
        const filePatch = createFilePatch(null, 'a.txt', 'added', [
        assert.deepEqual(filePatch.getUnstagePatchForLines(new Set(linesFromHunk)), createFilePatch(
          'a.txt', 'a.txt', 'modified', [
        const filePatch = createFilePatch(null, 'a.txt', 'added', [
        assert.deepEqual(filePatch.getUnstagePatchForLines(new Set(linesFromHunk)), createFilePatch(
    const filePatch = createFilePatch(null, 'a.txt', 'added', [
    assert.deepEqual(filePatch.getUnstagePatchForLines(new Set(linesFromHunk)), createFilePatch(
      'a.txt', 'a.txt', 'modified', [
        diff --git a/sample.js b/sample.js
        --- a/sample.js
        +++ b/sample.js
        diff --git a/e.txt b/e.txt
        new file mode 100644
        --- /dev/null
        +++ b/e.txt
    describe('typechange file patches', function() {
      it('handles typechange patches for a symlink replaced with a file', async function() {
        const workdirPath = await cloneRepository('symlinks');
        const repository = await buildRepository(workdirPath);

        await repository.git.exec(['config', 'core.symlinks', 'true']);

        const deletedSymlinkAddedFilePath = 'symlink.txt';
        fs.unlinkSync(path.join(workdirPath, deletedSymlinkAddedFilePath));
        fs.writeFileSync(path.join(workdirPath, deletedSymlinkAddedFilePath), 'qux\nfoo\nbar\n', 'utf8');

        const patch = await repository.getFilePatchForPath(deletedSymlinkAddedFilePath);
        assert.equal(patch.toString(), dedent`
          diff --git a/symlink.txt b/symlink.txt
          deleted file mode 120000
          --- a/symlink.txt
          +++ /dev/null
          @@ -1 +0,0 @@
          -./regular-file.txt
          \\ No newline at end of file
          diff --git a/symlink.txt b/symlink.txt
          new file mode 100644
          --- /dev/null
          +++ b/symlink.txt
          @@ -0,0 +1,3 @@
          +qux
          +foo
          +bar

        `);
      });

      it('handles typechange patches for a file replaced with a symlink', async function() {
        const workdirPath = await cloneRepository('symlinks');
        const repository = await buildRepository(workdirPath);

        const deletedFileAddedSymlinkPath = 'a.txt';
        fs.unlinkSync(path.join(workdirPath, deletedFileAddedSymlinkPath));
        fs.symlinkSync(path.join(workdirPath, 'regular-file.txt'), path.join(workdirPath, deletedFileAddedSymlinkPath));
        const patch = await repository.getFilePatchForPath(deletedFileAddedSymlinkPath);
        assert.equal(patch.toString(), dedent`
          diff --git a/a.txt b/a.txt
          deleted file mode 100644
          --- a/a.txt
          +++ /dev/null
          @@ -1,4 +0,0 @@
          -foo
          -bar
          -baz
          -
          diff --git a/a.txt b/a.txt
          new file mode 120000
          --- /dev/null
          +++ b/a.txt
          @@ -0,0 +1 @@
          +${toGitPathSep(path.join(workdirPath, 'regular-file.txt'))}
          \\ No newline at end of file
  });

  describe('getHeaderString()', function() {
    it('formats paths with git path separators', function() {
      const oldPath = path.join('foo', 'bar', 'old.js');
      const newPath = path.join('baz', 'qux', 'new.js');

      const patch = createFilePatch(oldPath, newPath, 'modified', []);
      assert.equal(patch.getHeaderString(), dedent`
        diff --git a/foo/bar/old.js b/baz/qux/new.js
        --- a/foo/bar/old.js
        +++ b/baz/qux/new.js

      `);
    });
  });