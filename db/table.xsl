<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" encoding="UTF-8" />
<xsl:template match="/document">
<html>
<head>
	<title><xsl:value-of select="table/name" /></title>
</head>
<style type="text/css">
table { border-collapse: collapse; margin-bottom: 10px; }
table table { margin: 0; }
td, th{ padding: 3px; border: solid 1px #ccc; }
th { background-color: #666; color: #fff; text-align: left; }
</style>
<body>
<table>
	<tr><th width="180">name</th><td><xsl:value-of select="table/name" /></td></tr>
	<tr><th>engine</th><td><xsl:value-of select="table/engine" /></td></tr>
	<tr><th>note</th><td><xsl:value-of select="table/note" /></td></tr>
</table>

<table>
	<tr>
		<th width="180">field</th><th>type</th><th>not null</th><th>default</th><th>extra</th><th>note</th>
	</tr>
	<xsl:for-each select="columns/column" >
	<tr>
		<xsl:attribute name="bgcolor">
			<xsl:value-of select="bgcolor" />
		</xsl:attribute>
		<td><xsl:value-of select="field" /></td>
		<td><xsl:value-of select="type" /></td>
		<td><xsl:value-of select="not-null" /></td>
		<td><xsl:value-of select="default" /></td>
		<td><xsl:value-of select="extra" /></td>
		<td><xsl:value-of select="note" /></td>
	</tr>
	</xsl:for-each>
</table>

<table>
	<tr>
		<th width="180">primary key</th>
		<td><xsl:value-of select="primary-key/column" /></td>
	</tr>
	<tr>
		<th>key</th>
		<td style="padding:0;">

<table>
	<xsl:for-each select="keys/key" >
	<tr>
		<th><xsl:value-of select="name" /></th>
		<td><xsl:value-of select="column" /></td>
	</tr>
	</xsl:for-each>
</table>

		</td>
	</tr>
	<tr>
		<th>partition</th>
		<td><xsl:value-of select="partition" /></td>
	</tr>
</table>


</body>
</html>
</xsl:template>
</xsl:stylesheet>